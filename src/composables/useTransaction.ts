import { ref, reactive } from 'vue'
import { createTransactionRq , deleteTransactionRq, getTotalTransactionsRq, getTransactionByIdRq, getTransactionsRq, updateTransactionRq, } from '../services/transactionService'
import type { Transaction, TransactionItem, TransactionType } from '../interfaces'
import { toast } from 'vue-sonner'
import { useDate } from './useDate'
import { currentDate } from '@/utils/date'

const { targetDate } = useDate()

const totalTransaction = ref(0)

// Reactive filters state
const filters = reactive({
  limit: 15 as number | undefined,
  offset: 0 as number | undefined,
  startDate: currentDate(),
  endDate: null as string | null,
  categoryId: null as number | null,
  type: null as TransactionType | null
})

export type TransactionFilters = typeof filters

export function useTransaction() {

  const loading = ref(false)
  const error = ref<string | null>(null)
  const transactions = ref<TransactionItem[]>([])
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
  const updateTransaction = async (data: Partial<Transaction>) => {
    if (!data.id) {
      toast.error('Transacción no encontrada')
      return { success: false }
    }
    loading.value = true
    error.value = null
    try {
      await updateTransactionRq({...data })
      toast.success('Transacción actualizada correctamente')

      return { success: true }
    } catch (err: any) {
      error.value = err?.message || 'Error al actualizar la transacción'
      toast.error(err?.message || 'Error al actualizar la transacción')
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
      transactions.value = [...transactions.value, ...result]

      return result
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener las cuentas'
      throw err
    } finally {
      loadingTransactions.value = false
    }
  }

  const getTransactionById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const result = await getTransactionByIdRq(id)
      return result
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener la transacción'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Function to update filters
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    Object.assign(filters, newFilters)
  }

  // Function to clear filters
  const clearFilters = () => {
    filters.startDate = currentDate()
    filters.endDate = null
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

  const deleteTransaction = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await deleteTransactionRq(id)
      toast.success('Transacción eliminada correctamente')
      return { success: true }
    } catch (err: any) {
      error.value = err?.message || 'Error al eliminar la transacción'
      toast.error(err?.message || 'Error al eliminar la transacción')
      return { success: false }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    transactions,
    loadingTransactions,

    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    
    totalTransaction,
    getTotalTransactions,
    
    filters,
    updateFilters,
    clearFilters,
  }
}