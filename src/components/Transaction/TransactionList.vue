<script setup lang="ts">
import TransactionFilters from '@/components/Transaction/TransactionFilters.vue'
import { useCategory } from '@/composables/useCategory';
import { useTransaction } from '@/composables/useTransaction';
import EmptyRecords from '@/commons/EmptyRecords.vue';

const { categories, getCategories } = useCategory()
const { transactions, getTransactions, filters, clearFilters } = useTransaction()

getCategories()
getTransactions()

const updateFilters = (newFilters: Partial<typeof filters>) => {
    Object.assign(filters, newFilters)
    getTransactions()
}

const handleClearFilters = () => {
    clearFilters()
    getTransactions()
}

// Helper function to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
    }).format(amount)
}

// Helper function to format date
const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('es-PE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date))
}

// Helper function to get transaction type styling
const getTransactionTypeStyle = (type: string) => {
    return type === 'income' ? 'text-emerald-600' : 'text-red-500'
}

// Helper function to get category icon (you can customize this based on your categories)
const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
        'food': '🍽️',
        'transport': '🚗',
        'entertainment': '🎬',
        'shopping': '🛍️',
        'health': '🏥',
        'education': '📚',
        'salary': '💼',
        'other': '📋'
    }
    return icons[category?.toLowerCase()] || '📋'
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 p-4">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Historial de Transacciones</h1>
            <p class="text-gray-600">Gestiona y revisa tus movimientos financieros</p>
        </div>

        <!-- Filters Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-6">
            <TransactionFilters
                :categories="categories"
                :filters="filters"
                @updateFilters="updateFilters"
                @clearFilters="handleClearFilters"
            />
        </div>

        <!-- Transactions List -->
        <div v-if="transactions.length > 0" class="space-y-4">
            <!-- Summary Card -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-blue-100 text-sm font-medium">Total de Transacciones</p>
                        <p class="text-2xl font-bold">{{ transactions.length }}</p>
                    </div>
                    <div class="bg-white/20 rounded-full p-3">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Transaction Cards Grid -->
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div 
                    v-for="transaction in transactions" 
                    :key="transaction.id"
                    class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300 group"
                >
                    <!-- Transaction Header -->
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="bg-gray-100 rounded-full p-2 group-hover:bg-gray-200 transition-colors">
                                <span class="text-lg">{{ getCategoryIcon(transaction.category) }}</span>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900 text-sm">
                                    {{ transaction.name }}
                                </h3>
                                <p class="text-xs text-gray-500">
                                    {{ transaction.category || 'Sin categoría' }}
                                </p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p 
                                class="font-bold text-lg"
                                :class="getTransactionTypeStyle(transaction.type)"
                            >
                                {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(Math.abs(transaction.amount)) }}
                            </p>
                        </div>
                    </div>

                    <!-- Transaction Details -->
                    <div class="space-y-2">
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-gray-500">Fecha:</span>
                            <span class="text-gray-900 font-medium">
                                {{ formatDate(transaction.date) }}
                            </span>
                        </div>
                        
                        <div v-if="transaction.description" class="pt-2 border-t border-gray-100">
                            <p class="text-xs text-gray-600 line-clamp-2">
                                {{ transaction.description }}
                            </p>
                        </div>

                        <!-- Transaction Type Badge -->
                        <div class="flex justify-between items-center pt-2">
                            <span 
                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                :class="transaction.type === 'income' 
                                    ? 'bg-emerald-100 text-emerald-800' 
                                    : 'bg-red-100 text-red-800'"
                            >
                                {{ transaction.type === 'income' ? 'Ingreso' : 'Gasto' }}
                            </span>
                            
                            <!-- Action Menu (Optional) -->
                            <button class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Load More Button (Optional) -->
            <div class="flex justify-center pt-6">
                <button class="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm">
                    Cargar más transacciones
                </button>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <EmptyRecords message="No hay movimientos para esta fecha"/>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>