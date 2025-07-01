import { ref } from 'vue'
import * as accountService from '../services/accountService'
import type { Account } from '../interfaces'

export function useAccount() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const account = ref<Account | null>(null)

  const createAccount = async (data: Partial<Account>) => {
    loading.value = true
    error.value = null
    try {
      const result = await accountService.createAccount({...data, userId: 1})
      account.value = result
      return result
    } catch (err: any) {
      error.value = err?.message || 'Error al crear la cuenta'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    account,
    createAccount
  }
} 