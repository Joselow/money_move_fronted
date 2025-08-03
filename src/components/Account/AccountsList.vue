<script setup lang="ts">
import FullScreenLoader from '../../commons/FullScreenLoader.vue'
import CommonLoader from '@/commons/CommonLoader.vue'
import ScrollX from '@/commons/ScrollX.vue'

import { useAccount } from '../../composables/useAccount'
import { useConfig } from '../../composables/useConfig'

import type { Account } from '../../interfaces'
import { useTransaction } from '@/composables/useTransaction'

const { loadingAccounts, error } = useAccount()
const { config, selectAccount, loading } = useConfig()

const { getTotalTransactions, loading: loadingTotal } = useTransaction()

const props = defineProps<{
  accounts: Account[]
}>()


const handleAccountSelect = async (account: Account) => {
  const { success } = await selectAccount(account)
  if (!success) return 
  getTotalTransactions()
}

</script>

<template>
  <CommonLoader v-if="loading || loadingTotal"/>
  
  <div class="w-full max-w-4xl mx-auto">
    <FullScreenLoader v-if="loadingAccounts" />
    
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl text-white"><i class="pi pi-file-edit"></i> Selecciona la cuenta</h2>
    </div>

    <!-- Error message -->
    <div v-if="error" class="mb-4 p-4 bg-red-900/20 border border-red-800 rounded-lg">
      <p class="text-red-400 text-sm">{{ error }}</p>
    </div>

    <!-- Accounts container -->
    <div class="relative">

      <!-- Accounts scroll container -->
      <ScrollX>
        <div
          v-for="(account, index) in props.accounts"
          :key="index"
          @click="handleAccountSelect(account)"
          class=" flex-shrink-0 w-76 bg-gray-800 border-2 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-all duration-200"
          :class="[config.account?.id === account.id ? 'bg-indigo-900/20' : '']"
          style="scroll-snap-align: start;"
        >
          <!-- Account header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <i class="pi pi-address-book text-blue-400" />
              <h3 class="text-lg font-semibold text-white">{{ account.name }}</h3>
            </div>
            <div 
              v-if="config.account?.id === account.id"
              class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs animate-bounce"
            >
                <i class="pi pi-check"></i>
              Activa
            </div>
          </div>

          <!-- Account details -->
          <div class="space-y-3">
            <div v-if="account.description" class="text-gray-400 text-sm">
              {{ account.description }}
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-gray-400 text-sm">Balance:</span>
              <span class="text-xl font-bold text-white">
                {{ account.currency }} {{ parseFloat(account.totalBalance).toFixed(2) }}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-gray-400 text-sm">Moneda:</span>
              <span class="text-white font-medium">{{ account.currency }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-gray-400 text-sm">Creada:</span>
              <span class="text-white text-sm">
                {{ new Date(account.createdAt).toLocaleDateString() }}
              </span>
            </div>
          </div>

        </div>
      </ScrollX>
    </div>

    <!-- Empty state -->
    <div v-if="!loadingAccounts && accounts.length === 0" class="text-center py-8">
      <i class="pi pi-address-book text-4xl text-gray-600 mb-4" />
      <p class="text-gray-400">No tienes cuentas creadas</p>
      <p class="text-gray-500 text-sm">Crea tu primera cuenta para comenzar</p>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style> 