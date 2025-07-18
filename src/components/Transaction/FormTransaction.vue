<script setup lang="ts">
import { computed, ref } from 'vue'

import ScrollX from '@/commons/ScrollX.vue';

import { useConfig } from '@/composables/useConfig';
import { TRANSACTION_TYPE } from '@/constants/transaction';
import type { Category, TransactionType } from '@/interfaces';
import { useTransaction } from '@/composables/useTransaction';
import { useRouter } from 'vue-router';

const { createTransaction } = useTransaction()

const { config } = useConfig()

const router = useRouter()

const props = defineProps<{
    type: TransactionType,
    categories: Category[],
}>()

// Supongo que tienes una variable global o un prop para el ícono de la moneda.
// Reemplaza 'tu_variable_del_icono' con el nombre de tu variable global.
const currencyIcon = '💵'; // Ejemplo: 💵, €, $


const bg = computed(() => props.type == TRANSACTION_TYPE.OUTFLOW ? 'bg-rose-400' : 'bg-green-500')
const border = computed(() => props.type == TRANSACTION_TYPE.OUTFLOW ? 'border-rose-400' : 'border-green-500')
const text = computed(() => props.type == TRANSACTION_TYPE.OUTFLOW ? 'text-red-500' : 'text-green-500')

const categoryId = ref<number | null>(null)
const amount = ref<number | null>(null)
const notes = ref('')

const save = async() => {
    if (!categoryId.value || !amount.value) {
        return
    }
    const { success } = await createTransaction({
        name: 'test',
        type: props.type,
        amount: Number(amount.value),
        description: notes.value,
        accountId: config.account?.id,
        categoryId: categoryId.value
    })
    
    if (success) {
        router.push({ name: 'Home' })
    }
}

const selectCategory = async (id: number) => {
    console.log(id);

    categoryId.value = id
}
</script>

<template>
    <div :class="`bg-neutral-900 border border-neutral-700 rounded-2xl p-8 flex flex-col gap-6 shadow-2xl ${border}`">
        <div>
            <ScrollX class="gap-3">
                <template v-for="category in categories" :key="category.id">
                    <div
                        class="px-6 py-2 border-2 rounded-full text-white cursor-pointer whitespace-nowrap transition-all duration-300 transform hover:scale-105"
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
                SAVE
            </button>
        </div>
    </div>
</template>