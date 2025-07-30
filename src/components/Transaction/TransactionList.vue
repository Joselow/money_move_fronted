<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import TransactionFilters from '@/components/Transaction/TransactionFilters.vue'
import CommonLoader from '@/commons/CommonLoader.vue';
import EmptyRecords from '@/commons/EmptyRecords.vue';

import { TRANSACTION_TYPE } from '@/constants/transaction';

import { formatCurrency } from '@/utils/format';
import { currentDate, formatOnlyHours, formatFullDateText } from '@/utils/date';

import { useDate } from '@/composables/useDate';
import { useTransaction } from '@/composables/useTransaction';
import { useConfig   } from '@/composables/useConfig';
import type { TransactionItem, TransactionType } from '@/interfaces';
import { lastRoute } from '@/router';
import { exportTransactionsToExcel } from '@/helpers/exportExcel';

const { targetDate, updateTargetDate, resetDate, } = useDate()
const { config } = useConfig()

const { transactions, getTransactions, filters, clearFilters, loadingTransactions } = useTransaction()

const router = useRouter()

start()


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

const editTransaction = (transaction: TransactionItem) => {
    localStorage.setItem('LOCAL_STORAGE_SAVE_TRANSAC_ITEM', JSON.stringify(transaction))

    const isDiferentDate = filters.startDate !== currentDate()
    
    router.push({
        name: transaction.type === TRANSACTION_TYPE.INFLOW ? 'Inflow' : 'Outflow', 
        params: { id: transaction.id }, 
        // si esdiferente incluir este query param, sino nada
        query: isDiferentDate ? { date: filters.startDate } : {}
    })
}


function getDateFromForwardQueryParams () {
    console.log({lastRoute});
    
    if (!lastRoute) return null

    const url = new URL(lastRoute as string, window.location.origin);
    const date = url.searchParams.get('date');

   return date
}

function start () {
    const date = getDateFromForwardQueryParams()
    filters.startDate = date ?? targetDate.value
    filters.offset = 0
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
            <div class="mb-4 shadow-lg rounded-xl py-2 text-white shadow-lg">
                <div class="flex justify-between items-center">
                    <div class="leading-none">
                        <input ref="dateInput" class="text-sm hidden" type="date" v-model="filters.startDate"
                            @change="handleChangeDate"
                        >
                        <p>
                            {{ formatFullDateText(filters.startDate) }}
                            <span class="text-sm cursor-pointer hover:bg-neutral-600 ml-1 bg-neutral-700/50 rounded-full px-2 py-1"
                                @click="changeDate"
                            >
                                <i class="pi pi-pencil"></i>
                            </span>
                        </p>
                    </div>
                    <!-- <div class="rounded-full p-2">
                        <i class="pi pi-cog"></i>
                    </div> -->
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
                               {{ config.account?.currency ?? '$' }} {{ transaction.type === TRANSACTION_TYPE.INFLOW ? '' : '-' }} {{ formatCurrency(Math.abs(transaction.amount)) }}
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
                            <button class="cursor-pointer text-md text-gray-400 mb-0 pb-0 hover:text-white px-3 rounded-full hover:scale-105 transition-colors"
                             @click="editTransaction(transaction)"
                            >
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
        <div v-else class="mt-10">
            <EmptyRecords message="No hay movimientos para esta fecha"/>
        </div>
    </div>

    <button class="cursor-pointer hover:bg-gray-300 shadow-lg bg-white border border-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm"
        @click="exportTransactionsToExcel(transactions)"
    >
        Exportar a Excel
    </button>
</template>

<style scoped>
</style>