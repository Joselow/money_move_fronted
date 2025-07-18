import { ref } from 'vue'
import { createTransactionRq , getTotalTransactionsRq, getTransactionsRq } from '../services/transactionService'
import type { Transaction } from '../interfaces'
import { toast } from 'vue-sonner'

export function useTransaction() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const transactions = ref<Transaction[]>([])
  const loadingTransactions = ref(false)
  const totalTransaction = ref(0)

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

  const getTransactions = async ({ date }: { date?: string }) => {
    loadingTransactions.value = true
    error.value = null
    try {
      const result = await getTransactionsRq({ date })
      transactions.value = result
      return result
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener las cuentas'
      throw err
    } finally {
      loadingTransactions.value = false
    }
  }

  const getTotalTransactions = async ({ date }: { date?: string } = {}) => {
    loading.value = true
    error.value = null
    try {
      const result = await getTotalTransactionsRq({ date })
      totalTransaction.value = result.total
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
    createTransaction,
    getTransactions,
    getTotalTransactions,
    totalTransaction
  }
} 