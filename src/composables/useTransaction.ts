import { ref, reactive } from 'vue'
import { createTransactionRq , getTotalTransactionsRq, getTransactionsRq, } from '../services/transactionService'
import type { Transaction, TransactionType } from '../interfaces'
import { toast } from 'vue-sonner'
import { useDate } from './useDate'
import { currentDate, endOfMonth } from '@/utils/date'

const { targetDate } = useDate()

const totalTransaction = ref(0)

// Reactive filters state
const filters = reactive({
  startDate: currentDate(),
  endDate: endOfMonth(),
  categoryId: null as number | null,
  type: null as TransactionType | null
})

export type TransactionFilters = typeof filters

export function useTransaction() {

  const loading = ref(false)
  const error = ref<string | null>(null)
  const transactions = ref<Transaction[]>([])
  const loadingTransactions = ref(false)

  const createTransaction = async (data: Partial<Transaction>) => {
    loading.value = true
    error.value = null
    try {
      await createTransactionRq({...data })
      toast.success('Transacción creada correctamente')

      return { success: true }
    } catch (err: any) {
      error.value = err?.message || 'Error al crear la cuenta'
      toast.error(err?.message || 'Error al crear la cuenta')
      return { success: false }
    } finally {
      loading.value = false
    }
  }

  const getTransactions = async () => {
    loadingTransactions.value = true
    error.value = null
    try {
      const result = await getTransactionsRq({...filters})
      transactions.value = result
      return result
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener las cuentas'
      throw err
    } finally {
      loadingTransactions.value = false
    }
  }

  // Function to update filters
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    Object.assign(filters, newFilters)
  }

  // Function to clear filters
  const clearFilters = () => {
    filters.startDate = currentDate()
    filters.endDate = endOfMonth()
    filters.categoryId = null
    filters.type = null
  }

  const getTotalTransactions = async ({ date }: { date?: string | null } = {}) => {
    console.log({targetDate : targetDate.value});

    loading.value = true
    error.value = null
    try {
      console.log({date});
      
      const dateValue = date ?? targetDate.value
      

      const result = await getTotalTransactionsRq({ date: dateValue })
      totalTransaction.value = result.total
      console.log(totalTransaction.value);
      
      return result
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener las cuentas'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    transactions,
    loadingTransactions,
    filters,
    createTransaction,
    getTransactions,
    updateFilters,
    clearFilters,
    getTotalTransactions,
    totalTransaction
  }
}