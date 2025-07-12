import { ref } from 'vue'
import * as accountService from '../services/accountService'
import type { Account } from '../interfaces'
import { useConfig } from './useConfig'

const { config, selectAccount } = useConfig()

export function useAccount() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const accounts = ref<Account[]>([])
  const loadingAccounts = ref(false)

  const createAccount = async (data: Partial<Account>) => {
    loading.value = true
    error.value = null
    try {
      const result = await accountService.createAccount({...data })

      if (config.account) {
        config.hasMultipleAccounts = true
        console.log(config.hasMultipleAccounts);
        
      } else {
        await selectAccount(result)
        // config.account = result
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

  const getAccounts = async () => {
    loadingAccounts.value = true
    error.value = null
    try {
      const result = await accountService.getAccounts()
      accounts.value = result

      return result
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener las cuentas'
      throw err
    } finally {
      loadingAccounts.value = false
    }
  }

  return {
    loading,
    error,
    accounts,
    loadingAccounts,
    createAccount,
    getAccounts
  }
} 