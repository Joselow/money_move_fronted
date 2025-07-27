<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

import ScrollX from '@/commons/ScrollX.vue';
import CommonLoader from '@/commons/CommonLoader.vue';

import { useConfig } from '@/composables/useConfig';
import { useTransaction } from '@/composables/useTransaction';
import { useRoute, useRouter } from 'vue-router';

import { TRANSACTION_TYPE } from '@/constants/transaction';
import type { Category, TransactionItem, TransactionType } from '@/interfaces';

import { useDate } from '@/composables/useDate';
import { getItem } from '@/utils/localStorage';

const { createTransaction, getTransactionById, updateTransaction, loading } = useTransaction()
const { targetDate } = useDate()

const { config } = useConfig()

const router = useRouter()
const route = useRoute()

const { id } = route.params

const props = defineProps<{
    type: TransactionType,
    categories: Category[],
}>()

const bg = computed(() => props.type == TRANSACTION_TYPE.OUTFLOW ? 'bg-rose-400' : 'bg-green-500')
const border = computed(() => props.type == TRANSACTION_TYPE.OUTFLOW ? 'border-rose-400' : 'border-green-500')
const text = computed(() => props.type == TRANSACTION_TYPE.OUTFLOW ? 'text-red-500' : 'text-green-500')

const categoryId = ref<number | null>(null)
const amount = ref<number | null>(null)
const notes = ref('')
const infoDate = ref<string | null>(null)
const amountInput = ref<HTMLInputElement | null>(null)

startRequest()

async function startRequest() {
    if (!id) {
        clearForm()
        return
    }

    const transaction: string | null = getItem()
    if (transaction) {
        const transactionData = JSON.parse(transaction) as TransactionItem
        if  (Number(transactionData.id) == Number(id)) {
            setForm(JSON.parse(transaction) as TransactionItem)
        }
        else {
            router.push({ name: 'Home' })
        }
    } else {
        const transaction = await getTransactionById(Number(id))        
        setForm(transaction)
    }
}

const save = async() => {
    if (!categoryId.value || !amount.value) {
        return
    }
    const { success } = id 
        ? await updateTransaction({
            id: Number(id),
            categoryId: categoryId.value,
            amount: Number(amount.value),
            description: notes.value,
            date: String(infoDate.value),
            accountId: config.account?.id,
        }) 
        : await createTransaction({
            type: props.type,
            categoryId: categoryId.value,
            amount: Number(amount.value),
            description: notes.value,
            date: targetDate.value,
            accountId: config.account?.id,
        })
    
    if (success) {
        clearForm()
        if (id) {
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
    categoryId.value = data.categoryId
    amount.value = data.amount
    notes.value = data.description
    infoDate.value = data.date
    console.log(categoryId.value);
}

const selectCategory = async (idCategory: number) => {
    console.log(id);
    
    const previousCategory = props.categories.find((category: Category) => category.id === categoryId.value)?.name || ''
    const newCategory = props.categories.find((category: Category) => category.id === idCategory)?.name || ''
    
    console.log({previousCategory, newCategory});
    
    categoryId.value = idCategory
    if (notes.value.includes(previousCategory)) {
        notes.value = notes.value.replace(previousCategory, newCategory)
    }
    else if (!notes.value.trim()) {
        notes.value = newCategory + ','
    }

    focusAmount()
}

const focusAmount = async () => {
    if (amountInput.value) {
        amountInput.value.focus()
    }
}

onMounted(() => {
    if (!id) {
        focusAmount()
    }
})
</script>

<template>

    <CommonLoader v-if="loading"/>

    <div :class="`bg-neutral-900 border border-neutral-700 rounded-2xl py-2 px-4 flex flex-col gap-5 shadow-2xl ${border}`">
        <div class="text-lg text-end text-white"
            v-if="id"
        >
            <label class="text-sm font-medium tex-muted text-neutral-300 me-2" for="date">Fecha transacción </label>
            <input type="date" id="date" v-model="infoDate">
        </div>

        <div>
            <ScrollX class="mt-1">
                <template v-for="category in categories" :key="category.id">
                    <div
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
            <router-link :to="{ name: 'Home' }" class="flex-shrink-0 w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center text-white text-2xl hover:bg-neutral-700 transition-colors">
                <i class="pi pi-arrow-left"></i>
            </router-link>

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