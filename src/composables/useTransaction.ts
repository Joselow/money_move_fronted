import { ref, reactive } from 'vue'
import { createTransactionRq , deleteTransactionRq, getTotalTransactionsRq, getTransactionByIdRq, getTransactionsRq, updateTransactionRq, } from '../services/transactionService'
import type { Transaction, TransactionItem, TransactionType } from '../interfaces'
import { toast } from 'vue-sonner'
import { useDate } from './useDate'
import { currentDate } from '@/utils/date'
import { useConfig } from './useConfig'

const { targetDate } = useDate()
const { config } = useConfig()

const totalTransaction = ref(0)

export interface TransactionFilters {
  limit: number | undefined;
  offset: number | undefined;
  startDate: string;
  endDate: string | null;
  categoryId: number | null;
  type: TransactionType | null;
}

export function useTransaction() {
  // Reactive filters state
  const LIMIT_PER_PAGE = 15
  const filters: TransactionFilters = reactive({
    limit: LIMIT_PER_PAGE,
    offset: 0,
    startDate: currentDate(),
    endDate: null,
    categoryId: null,
    type: null,
  })

  const loading = ref(false)
  const error = ref<string | null>(null)
  const transactions = ref<TransactionItem[]>([])
  const loadingTransactions = ref(false)

  const getTransactions = async () => {
    if (!config.account) {
      toast.error('No existe una cuenta seleccionada') 
      return []
    }
    loadingTransactions.value = true
    error.value = null

    try {

      if (filters.limit != LIMIT_PER_PAGE) {
        filters.limit = LIMIT_PER_PAGE
      }

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

  const createTransaction = async (data: Partial<Transaction>) => {
    if (!config.account) {
      toast.error('No existe una cuenta seleccionada') 
      return { success: false }
    }
    loading.value = true
    error.value = null
    try {
      await createTransactionRq({...data })
      toast.success('Transacción creada correctamente')

      return { success: true }
    } catch (err: any) {
      error.value = err?.message || 'Error al crear la cuenta'
      return { success: false }
    } finally {
      loading.value = false
    }
  }

  const updateTransaction = async (data: Partial<Transaction>) => {
    if (!config.account) {
      toast.error('No existe una cuenta seleccionada') 
      return { success: false }
    }
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
      return { success: false }
    } finally {
      loading.value = false
    }
  }
  
  const deleteTransaction = async (id: number) => {
    if (!config.account) {
      toast.error('No existe una cuenta seleccionada') 
      return { success: false }
    }
    loading.value = true
    error.value = null
    try {
      await deleteTransactionRq(id)
      toast.success('Transacción eliminada correctamente')
      return { success: true }
    } catch (err: any) {
      error.value = err?.message || 'Error al eliminar la transacción'
      return { success: false }
    } finally {
      loading.value = false
    }
  }

  const getTransactionById = async (id: number) => {
    if (!config.account) {
      toast.error('No existe una cuenta seleccionada') 
      return null
    }
    loading.value = true
    error.value = null
    try {
      const result = await getTransactionByIdRq(id)
      return result
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener la transacción'
      return null

    } finally {
      loading.value = false
    }
  }

  const reloadTransactions = async () => {
    if (!config.account) {
      toast.error('No existe una cuenta seleccionada') 
      return []
    }
    try {
      loadingTransactions.value = true

      filters.offset = 0

      if (filters.limit && transactions.value.length > filters.limit) {
        filters.limit = transactions.value.length
      }

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

  const getTransactionsToExport = async () => {
    if (!config.account) {
      toast.error('No existe una cuenta seleccionada') 
      return []
    }
    loading.value = true
    error.value = null

    try {
      const result = await getTransactionsRq({...filters, all: true})
      return result
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener las cuentas'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getTotalTransactions = async ({ date }: { date?: string | null } = {}) => {
    if (!config.account) {
      toast.error('No existe una cuenta seleccionada') 
      return
    }
    console.log({targetDate : targetDate.value});

    loading.value = true
    error.value = null
    try {
      console.log({date});
      
      const dateValue = date ?? targetDate.value
      

      const result = await getTotalTransactionsRq({ date: dateValue })
      totalTransaction.value = result.total
      
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener las cuentas'
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

    getTransactionsToExport,
    reloadTransactions
  }
}
