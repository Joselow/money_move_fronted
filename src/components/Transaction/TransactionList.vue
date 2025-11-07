<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { lastRoute } from '@/router';

import CommonLoader from '@/commons/CommonLoader.vue';
import EmptyRecords from '@/commons/EmptyRecords.vue';

import { exportTransactionsToExcel } from '@/helpers/exportExcel';
import { currentDate, formatOnlyHours, formatFullDateText, formatDate, formatHours } from '@/utils/date';
import { formatCurrency } from '@/utils/format';

import { useDate } from '@/composables/useDate';
import { useTransaction } from '@/composables/useTransaction';
import { useConfig   } from '@/composables/useConfig';


import { TRANSACTION_TYPE } from '@/constants/transaction';
import type { TransactionItem } from '@/interfaces';

const { targetDate, 
 } = useDate()
const { config } = useConfig()

const { transactions, getTransactions, reloadTransactions, filters, 
    loadingTransactions, getTransactionsToExport } = useTransaction()


const router = useRouter()

start()


/*COMENTADO PORQUE NO SE USA */
// const handleUpdateFilters = (newFilters: Partial<typeof filters>) => {
//     Object.assign(filters, newFilters)
//     reloadTransactions()
// }

// const handleClearFilters = () => {
//     clearFilters()
//     reloadTransactions()
// }


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
const dateEndInput = ref<HTMLInputElement | null>(null)

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

const handleChangeEndDate = async () => {
    filters.offset = 0
    transactions.value = []
    getTransactions()
}

const changeEndDate = async () => {
  if (!dateEndInput.value) return
  dateEndInput.value.showPicker()
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

const handleExportExcel = async () => {
    const transactions = await getTransactionsToExport()
    exportTransactionsToExcel(transactions)
}

/*COMENTADO PORQUE NO SE USA */
// const renderAdvancedFilter = ref(false)

// const toogleAdvancedFilters = async () => {
//     renderAdvancedFilter.value = !renderAdvancedFilter.value

//     if (categories.value.length < 1) {
//         getCategories()
//     }

//     if (renderAdvancedFilter.value) {
//         document.body.style.overflow = 'hidden';
//     } else {
//         document.body.style.overflow = 'auto';
//     }
// }

const formatTransactionDate = (transaction: TransactionItem) => {
    if (filters.startDate && filters.endDate) {
        return `${formatDate(transaction.date)} ${formatOnlyHours(transaction.createdAt)}`
    }
    return formatOnlyHours(transaction.createdAt)
}

const formatFilterDate = (date: string, prefijo: string = '') => {
    if (filters.startDate && filters.endDate) {
        return   `${prefijo} ${formatDate(date)}`
    }
    return formatFullDateText(date)
}

const removeFilterEndDate = async () => {
    filters.endDate = null
    transactions.value = []
    getTransactions()
}



</script>

<template>
    <CommonLoader v-if="loadingTransactions"/>

    <!-- COMENTADO PORQUE NO SE USA LOS FILTROS AVANZADOS -->
    <!-- <TransactionFilters v-if="renderAdvancedFilter" 
        :categories="categories"
        :filters="filters"
        @clearFilters="handleClearFilters"
        @update-filters="handleUpdateFilters"
    >
        <template #actions>
            <button
                @click="toogleAdvancedFilters"
                class="cursor-pointer px-6 py-2 text-md bg-red-500  rounded-xl hover:bg-red-600 transition-colors"
            >
                <i class="pi pi-times"></i>
                CERRAR 
            </button>
        </template>

    </TransactionFilters> -->
    <div class="min-h-screen">
        <!-- Sticky Header Section -->
        <div class="sticky top-0 z-10 bg-neutral-950  shadow-lg border-neutral-950">
            <!-- Transactions Title -->
            <h1 class="text-xl font-bold tracking-wider mb-2 text-white">Transacciones</h1>
            
            <!-- Date Header Card -->
            <section class="shadow-lg rounded-xl py-2 text-white shadow-lg">
                <div class="flex justify-between items-center">
                    <div class="w-full leading-none flex gap-5 flex justify-between ">
                        <div class="flex gap-2 flex-wrap">
                            <div>
                                <input ref="dateInput" class="text-sm hidden" type="date" v-model="filters.startDate"
                                    @change="handleChangeDate"
                                >
                                <div
                                    @click="changeDate"
                                >
                                    <span class="inline-block text-sm cursor-pointer hover:bg-neutral-600 bg-neutral-700/50 rounded-full px-3 py-2"
                                    >
                                        {{ formatFilterDate(filters.startDate, 'Del ') }}
                                        <i class="ml-1 pi pi-pencil"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <input ref="dateEndInput" class="text-sm hidden" type="date" v-model="filters.endDate"
                                    @change="handleChangeEndDate"
                                >
                                <div
                                    @click="changeEndDate"
                                >   
                                    <template v-if="filters.endDate">
                                        <span class="inline-block text-sm cursor-pointer hover:bg-indigo-800 bg-indigo-800/70 rounded-full px-3 py-2">
                                            {{ formatFilterDate(filters.endDate, 'Al ') }}
                                            <i class="ml-1 pi pi-pencil"></i>
                                        </span> 
                                    </template>
                                    <template v-else>      
                                        <span class="cursor-pointer text-indigo-400 inline-block hover:bg-indigo-600/60 rounded-full px-3 py-2">
                                            <i class="pi pi-calendar-plus text-lg"></i>
                                        </span>
                                    </template>
                                </div>
                                <div>
                                    <span 
                                        title="Borrar fecha"
                                        class="inline-block  cursor-pointer hover:bg-red-900/60 hover:text-white text-red-500 border border-red-600/60 rounded-lg px-2 py-2"
                                        v-if="filters.endDate"
                                        @click="removeFilterEndDate"
                                    >
                                        <i class="pi pi-calendar-times text-lg"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- <div>
                            <span class="inline-block px-3 py-2"
                                @click="toogleAdvancedFilters"
                            >
                                <i class="pi pi-cog"></i>
                            </span>
                        </div> -->
                    </div>
                </div>
            </section>
        </div>
        <div class="my-3 flex justify-between gap-2">
            <button class="me-2 text-xs cursor-pointer border border-blue-600 bg-blue-900/80 text-white font-bold hover:bg-blue-600/50 shadow-lg 
                px-6 py-1 rounded-lg  transition-colors font-medium"
                @click="reloadTransactions"
            >
                <i class="pi pi-refresh"></i>  RECARGAR
            </button>
            <button class="text-xs cursor-pointer border border-green-600 text-white font-bold hover:bg-green-600/50 shadow-lg 
                px-4 py-1 rounded-lg  transition-colors font-medium"
                @click="handleExportExcel"
            > 
                <i class="pi pi-file-excel"></i> EXCEL
                <!-- Exportar -->
            </button>
        </div>

        <!-- Content Area -->
        <div class="space-y-4" v-if="transactions.length">
            <!-- Transaction Cards Grid -->
            <div class="grid gap-2">
                <div 
                    v-for="transaction in transactions" 
                    :key="transaction.id"
                    @click="editTransaction(transaction)"
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
                                {{ formatTransactionDate(transaction) }}
                             </div>
                            <!-- <button class="cursor-pointer text-md text-gray-400 mb-0 pb-0 hover:text-white px-3 rounded-full hover:scale-105 transition-colors"
                             @click="editTransaction(transaction)"
                            >
                                <i class="pi pi-external-link"></i>
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="mt-10">
            <EmptyRecords message="No hay movimientos para esta fecha"/>
        </div>
        
        <!-- load more-->
        <div class="text-center mt-2 mb-18">
            <button class="cursor-pointer border border-gray-600 text-white font-bold hover:bg-gray-600/50 shadow-lg 
                px-6 py-2 rounded-lg  transition-colors font-medium"
                @click="handleLoadMore"
            >
                <!-- <i class="pi pi-refresh"></i>  -->
                Cargar mas...
            </button>
        </div>
      
    </div>
</template>

<style scoped>
</style>