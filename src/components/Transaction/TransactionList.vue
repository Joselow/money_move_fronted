<script setup lang="ts">
import { ref } from 'vue';

import TransactionFilters from '@/components/Transaction/TransactionFilters.vue'
import CommonLoader from '@/commons/CommonLoader.vue';
import EmptyRecords from '@/commons/EmptyRecords.vue';

import { TRANSACTION_TYPE } from '@/constants/transaction';

import { formatCurrency } from '@/utils/format';
import { currentDate, formatDate, formatOnlyHours, formatFullDateText } from '@/utils/date';

import { useDate } from '@/composables/useDate';
import { useCategory } from '@/composables/useCategory';
import { useTransaction } from '@/composables/useTransaction';

const { targetDate, updateTargetDate, resetDate } = useDate()

const { categories, getCategories } = useCategory()
const { transactions, getTransactions, filters, clearFilters, loadingTransactions } = useTransaction()

getCategories()
filters.startDate = targetDate.value
filters.offset = 0
getTransactions()

const updateFilters = (newFilters: Partial<typeof filters>) => {
    Object.assign(filters, newFilters)
    getTransactions()
}

const handleClearFilters = () => {
    clearFilters()
    getTransactions()
}


// Helper function to get transaction type styling
const getTransactionTypeStyle = (type: string) => {
    return type === TRANSACTION_TYPE.INFLOW ? 'text-emerald-600' : 'text-red-500'
}

// Helper function to get category icon (you can customize this based on your categories)
const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
        'comida': '🍽️',
        'transporte': '🚗',
        'entretenimiento': '🎬',
        'compras': '🛍️',
        'salud': '🏥',
        'educacion': '📚',
        'salario': '💼',
    }
    return icons[category?.toLowerCase()] || '📋'
}


const dateInput = ref<HTMLInputElement | null>(null)

const changeDate = async () => {
  if (!dateInput.value) return
  dateInput.value.showPicker()
}

const handleChangeDate = async (e: Event) => {
  const target = e.target as HTMLInputElement

  if (!target.value) {
    filters.startDate = currentDate()
  }

  filters.offset = 0
  transactions.value = []
  getTransactions()
}

const handleLoadMore = () => {
    if (filters.offset !== undefined && filters.limit !== undefined) {
        filters.offset += filters.limit
    }
    getTransactions()
}
</script>

<template>
    <CommonLoader v-if="loadingTransactions"/>

    <div class="min-h-screen">
        <!-- Sticky Header Section -->
        <div class="sticky top-0 z-10 bg-neutral-950  shadow-lg border-neutral-950">
            <!-- Transactions Title -->
            <h1 class="text-xl font-bold tracking-wider mb-2 text-white">Transacciones</h1>
            
            <!-- Date Header Card -->
            <div class="mb-4 shadow-lg rounded-xl p-2 px-5 text-white shadow-lg">
                <div class="flex justify-between items-center">
                    <div class="leading-none">
                        <input ref="dateInput" class="text-sm hidden" type="date" v-model="filters.startDate"
                            @change="handleChangeDate"
                        >
                        <p>
                            {{ formatFullDateText(filters.startDate) }}
                            <span class="cursor-pointer hover:bg-neutral-600 ml-1 bg-neutral-700 rounded-full px-2 py-1"
                                @click="changeDate"
                            >
                                <i class="pi pi-pencil"></i>
                            </span>
                        </p>
                    </div>
                    <div class="bg-white/20 rounded-full p-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Area -->
        <div class="space-y-4" v-if="transactions.length">
            <!-- Transaction Cards Grid -->
            <div class="grid gap-2">
                <div 
                    v-for="transaction in transactions" 
                    :key="transaction.id"
                    class=" rounded-xl shadow-md border border-2 border-gray-600 py-2 px-4 hover:shadow-lg transition-all duration-200 hover:border-gray-300 group"
                >
                    <!-- Transaction Header -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center  space-x-3">
                            <div class="text-center bg-white rounded-full w-7 h-7 transition-colors">
                                <span class="text-lg">{{ getCategoryIcon(transaction.categoryName) }}</span>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500">
                                    {{ transaction.categoryName || 'Sin categoría' }}
                                </p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p 
                                class="font-bold text-lg"
                                :class="getTransactionTypeStyle(transaction.type)"
                            >
                               {{ transaction.accountCurrency ?? '$' }} {{ transaction.type === TRANSACTION_TYPE.INFLOW ? '' : '-' }} {{ formatCurrency(Math.abs(transaction.amount)) }}
                            </p>
                        </div>
                    </div>

                    <!-- Transaction Details -->
                    <div class="mt-1">
                        <div class="flex justify-between items-center text-sm"
                            v-if="transaction.description"
                        >
                            <span class="text-gray-white font-medium">
                                {{ transaction.description }}
                            </span>
                        </div>
                        
                        <!-- Transaction Type Badge -->
                        <div class="leading-none flex justify-between items-center">                        
                            <!-- Action Menu (Optional) -->
                            <div class="pt-1 leading-none text-sm font-bold text-gray-400">
                                <!-- {{ formatDate(transaction.date) }}  -->
                                {{ formatOnlyHours(transaction.createdAt) }}
                             </div>
                            <button class="cursor-pointer text-md text-gray-400 mb-0 pb-0 hover:text-white px-3 rounded-full hover:scale-105 transition-colors">
                                <i class="pi pi-external-link"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Load More Button (Optional) -->
            <div class="flex justify-center pt-1">
                <button class="cursor-pointer hover:bg-gray-300 shadow-lg bg-white border border-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm"
                    @click="handleLoadMore()"
                >
                    Cargar más...
                </button>
            </div>
        </div>
        <!-- Empty State -->
        <div v-else class="">
            <EmptyRecords message="No hay movimientos para esta fecha"/>
        </div>
    </div>
</template>

<style scoped>
</style>