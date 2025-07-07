import { ref } from 'vue'
import * as accountService from '../services/accountService'
import type { Account } from '../interfaces'
import { useConfig } from './useConfig'

const { config } = useConfig()

export function useAccount() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const createAccount = async (data: Partial<Account>) => {
    loading.value = true
    error.value = null
    try {
      const result = await accountService.createAccount({...data })

      if (config.account) {
        config.hasMultipleAccounts = true
        console.log(config.hasMultipleAccounts);
        
      } else {
        config.account = result
        config.hasMultipleAccounts = false
      }
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
    createAccount
  }
} 