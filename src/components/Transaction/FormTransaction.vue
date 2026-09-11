<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';

import ScrollX from '@/commons/ScrollX.vue';
import CommonLoader from '@/commons/CommonLoader.vue';

import { useConfig } from '@/composables/useConfig';
import { useTransaction } from '@/composables/useTransaction';
import { useCategory } from '@/composables/useCategory';

import { TRANSACTION_TYPE } from '@/constants/transaction';
import type { Category, TransactionItem, TransactionType } from '@/interfaces';

import { getItem } from '@/utils/localStorage';
import { currentDate } from '@/utils/date';
import { toast } from 'vue-sonner';

const { categories, getCategories } = useCategory()
const { createTransaction, getTransactionById, updateTransaction, loading } = useTransaction()

const { config } = useConfig()

const router = useRouter()
const route = useRoute()

const id = computed(() => route.params.id as string | undefined)

const props = defineProps<{
    type: TransactionType
}>()

const activeType = ref<TransactionType>(props.type)

watch(() => props.type, (newType) => {
    activeType.value = newType
})

const bg = computed(() => activeType.value === TRANSACTION_TYPE.OUTFLOW ? 'bg-rose-400' : 'bg-green-500')
const border = computed(() => activeType.value === TRANSACTION_TYPE.OUTFLOW ? 'border-rose-400' : 'border-green-500')
const text = computed(() => activeType.value === TRANSACTION_TYPE.OUTFLOW ? 'text-red-500' : 'text-green-500')
const switchButtonClass = computed(() =>
  activeType.value === TRANSACTION_TYPE.OUTFLOW
    ? 'border-green-500 text-green-400 hover:bg-green-500/20'
    : 'border-rose-400 text-rose-400 hover:bg-rose-500/20'
)

const categoryId = ref<number | null>(null)
const amount = ref<number | null>(null)
const notes = ref('')
const infoDate = ref<string | null>(null)
const amountInput = ref<HTMLInputElement | null>(null)
const render = ref(false)

startRequest()

function syncCategoryForActiveType() {
    if (!categoryId.value) return

    const isValid = categories.value.some((category: Category) => category.id === categoryId.value)
    if (!isValid) {
        categoryId.value = null
    }
}

async function loadCategoriesForActiveType() {
    await getCategories(activeType.value)
    syncCategoryForActiveType()
}

async function startRequest() {
    if (!id.value) {
        activeType.value = props.type
        clearForm()
        infoDate.value = currentDate()
        await loadCategoriesForActiveType()
        render.value = true
        return
    }

    const transaction: string | null = getItem()

    if (transaction) {
        const transactionData = JSON.parse(transaction) as TransactionItem
        if (Number(transactionData.id) === Number(id.value)) {
            setForm(JSON.parse(transaction) as TransactionItem)
            render.value = true
        } else {
            router.push({ name: 'Home' })
            return
        }
    } else {
        const transactionItem = await getTransactionById(Number(id.value))
        if (transactionItem) {
            setForm(transactionItem)
            render.value = true
        } else {
            router.push({ name: 'Home' })
            return
        }
    }

    await loadCategoriesForActiveType()
}

const save = async() => {
    if (!categoryId.value || !amount.value) {
        toast.error('Debe seleccionar una categoría y un monto valido')
        return
    }

    const data = {
        categoryId: categoryId.value,
        amount: Number(amount.value),
        description: notes.value,
        date: String(infoDate.value),
        accountId: config.account?.id,
    }

    const { success } = id.value
        ? await updateTransaction({
            id: Number(id.value),
            type: activeType.value,
            ...data,
        })
        : await createTransaction({
            type: activeType.value,
            ...data
        })

    if (success) {
        clearForm()
        if (id.value) {
            router.push({ name: 'List' })
        }
    }
}

function clearForm () {
    categoryId.value = null
    amount.value = null
    notes.value = ''
}

function setForm (data: TransactionItem) {
    activeType.value = data.type
    categoryId.value = data.categoryId
    amount.value = data.amount
    notes.value = data.description
    infoDate.value = data.date
}

function applyCategoryToNotes(categoryName: string) {
    const trimmed = notes.value.trim()

    if (!trimmed) {
        notes.value = `${categoryName}, `
        return
    }

    const commaIndex = trimmed.indexOf(',')
    if (commaIndex >= 0) {
        notes.value = `${categoryName}${trimmed.slice(commaIndex)}`
    } else {
        notes.value = `${categoryName}, `
    }
}

const selectCategory = async (idCategory: number) => {
    const newCategory = categories.value.find((category: Category) => category.id === idCategory)
    if (!newCategory) return

    categoryId.value = idCategory
    applyCategoryToNotes(newCategory.name)
    focusAmount()
}

const focusAmount = async () => {
    if (amountInput.value) {
        amountInput.value.focus()
    }
}

const switchTransactionType = async () => {
    const nextType = activeType.value === TRANSACTION_TYPE.INFLOW
        ? TRANSACTION_TYPE.OUTFLOW
        : TRANSACTION_TYPE.INFLOW

    activeType.value = nextType
    await loadCategoriesForActiveType()

    router.replace({
        name: nextType === TRANSACTION_TYPE.INFLOW ? 'Inflow' : 'Outflow',
        params: id.value ? { id: id.value } : {},
        query: route.query,
    })
}

const selectedCategory = ref<HTMLDivElement [] | null>(null);

onMounted(async() => {
    if (!id.value) {
        focusAmount()
    }

    if (selectedCategory.value && selectedCategory.value[0]) {
        selectedCategory.value[0].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
})

</script>

<template>
    <CommonLoader v-if="loading"/>
    <template v-if="render">
        <div :class="`bg-neutral-900 border border-neutral-700 rounded-2xl py-2 px-4 flex flex-col gap-5 shadow-2xl ${border}`">
            <div class="flex items-center justify-between gap-3 text-white">
                <button
                    type="button"
                    class="cursor-pointer flex-shrink-0 border-3 rounded-lg px-4 py-2 transition-colors"
                    :class="switchButtonClass"
                    title="Cambiar tipo de transacción"
                    @click="switchTransactionType"
                >
                    <i class="pi pi-arrow-right-arrow-left rotate-90"></i>
                </button>
                <div class="text-lg text-end flex-1">
                    <label class="text-sm font-medium tex-muted text-neutral-300 me-2" for="date">Fecha transacción</label>
                    <input type="date" id="date"
                        v-model="infoDate"
                        :max="currentDate()"
                    >
                </div>
            </div>
            <div>
                <ScrollX class="mt-2 px-2 py-2">
                    <template v-for="category in categories" :key="category.id">
                        <div
                            :ref="category.id === categoryId ? 'selectedCategory' : ''"
                            class="mt-1 px-6 py-2 border-2 rounded-full text-white cursor-pointer whitespace-nowrap transition-all duration-300 transform hover:scale-105"
                            @click="selectCategory(category.id)"
                            :class="{
                                'ring-2 ring-offset-2 ring-offset-neutral-900': categoryId === category.id,
                                'border-neutral-700': categoryId !== category.id
                            }"
                            :style="{
                                'border-color': category.color,
                                'background-color': categoryId === category.id ? `${category.color}40` : ''
                            }"
                        >
                            {{ category.name }}
                        </div>
                    </template>
                </ScrollX>
            </div>

            <div class="relative">
                <span :class="`absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-light ${text}`">
                    {{ config.account?.currency }}
                </span>
                <input
                    v-model.number="amount"
                    type="number"
                    placeholder="0.00"
                    ref="amountInput"
                    :class="`${text} w-full h-32 pl-12 pr-4 text-center text-6xl font-light tracking-wide rounded-xl bg-transparent border-2 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-300`"
                    :style="{ 'border-color': text === 'text-red-500' ? 'rgb(239 68 68)' : 'rgb(34 197 94)', 'color': text === 'text-red-500' ? 'rgb(239 68 68)' : 'rgb(34 197 94)' }"
                />
            </div>

            <textarea
                v-model="notes"
                placeholder="Descripción"
                rows="3"
                :class="`w-full px-4 py-3 border-2 border-neutral-700 rounded-xl bg-transparent text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-300`"
            ></textarea>

            <div class="flex justify-between items-center gap-4 mt-2">
                <button
                    @click="save"
                    class="flex-1 py-4 text-white font-bold rounded-xl transition-colors duration-300"
                    :class="`border-2 ${border} ${bg}`"
                >
                    Guardar
                </button>
            </div>
        </div>
    </template>
</template>
