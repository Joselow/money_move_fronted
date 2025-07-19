<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'

import FormAccount from './Account/FormAccount.vue'
import AccountsList from './Account/AccountsList.vue'

const ModalBase = defineAsyncComponent(() => import('@/commons/ModalBase.vue'))

import { useConfig } from '@/composables/useConfig'
import { useAuth } from '@/composables/useAuth'
import { useAccount } from '@/composables/useAccount'

import type { Account } from '@/interfaces'


const open = defineModel<boolean>({default: false})

const { authenticated, logout, } = useAuth()
const { config } = useConfig()
const { getAccounts, accounts } = useAccount()

function close() {
  open.value = false
}

const showModalFormAccount = ref(false)
const showAccountsList = ref(false)

const onCreateAccount = (account: Account) => {
  open.value = false
  showModalFormAccount.value = false
}

const renderAccountsListModal = ref(false)

const openAccountsListModal = async () => {
  renderAccountsListModal.value = true
  showAccountsList.value = true
  getAccounts()
}

</script>

<template>
<ModalBase v-model="showModalFormAccount">
    <div class="py-4 px-4">
      <h1 class="text-lg font-bold tracking-wider mb-3">
        <i class="pi pi-address-book" />
        Crear cuenta
      </h1>
      <div class="flex justify-center items-center ">
        <FormAccount @created="onCreateAccount" >
          <template #actions>
            <button type="button" class="px-4 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition duration-200"
              @click="showModalFormAccount = false"
            >
            <i class="pi pi-arrow-left" />
            </button>
          </template>
        </FormAccount>
      </div>
    </div>
  </ModalBase>

  <!-- Modal para lista de cuentas -->
  <ModalBase v-if="renderAccountsListModal" v-model="showAccountsList" max-width="lg">
    <div class="p-4">
      <AccountsList 
        :accounts="accounts"
      />
    </div>
  </ModalBase>

  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Fondo oscuro -->
    <div class="absolute inset-0 bg-black/90 bg-opacity-70 transition-opacity" @click="close"></div>
    <!-- Contenido de opciones -->
    <div class="relative z-10 w-full max-w-xs mx-auto bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col space-y-3  animate-fade-in">
      <button class="w-full py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition" 
          @click="showModalFormAccount = true"
          >
          <i class="pi pi-address-book" />
          Nueva cuenta
      </button>
      <template v-if="config.hasMultipleAccounts">
        <button class="w-full py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition" 
          @click="openAccountsListModal"
        >
          <i class="pi pi-arrow-right-arrow-left" />
          Cambiar de cuenta
        </button>
      </template>
      <template v-if="authenticated">
        <button class="mt-4 w-full py-2 rounded-lg border border-red-600  text-white hover:bg-red-700/50 transition" @click="logout">
          <i class="pi pi-sign-out" />
          Cerrar sesión
        </button>
      </template>
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.2s ease;
}
</style> 