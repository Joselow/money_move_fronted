<script setup lang="ts">
import { ref } from 'vue'
import FullScreenOptions from '../components/FullScreenOptions.vue'
import FormAccount from '../components/Account/FormAccount.vue'
import ModalBase from '../commons/ModalBase.vue'

import { useAuth } from '../composables/useAuth'
import type { Account } from '../interfaces'

const { authenticated, logout, user } = useAuth()


const showOptions = ref(false)
const showModalFormAccount = ref(false)

const onCreateAccount = (account: Account) => {
  console.log(account)
  
  showModalFormAccount.value = false
}


</script>

<template>
  
  <ModalBase v-model="showModalFormAccount">
    <div class="flex justify-center items-center py-4 px-4">
      <FormAccount @created="onCreateAccount" />
    </div>
  </ModalBase>

  <button @click="showModalFormAccount = true">
    Crear cuenta
  </button>

<FullScreenOptions :open="showOptions" @close="showOptions = false">
  <!-- <button class="w-full py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition" @click="onSelectAccount">
    Cambiar de cuenta
  </button> -->
  <button class="w-full py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition" 
    @click="showModalFormAccount = true"
    >
    Crear cuenta
  </button>
  <template v-if="authenticated">
    <button class="w-full py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition" @click="logout">
      Cerrar sesión
    </button>
  </template>
</FullScreenOptions>

  <div class="text-white">
    <div class="flex justify-between w-full relative">
      <h1 class="text-2xl font-bold tracking-wider">Bienvenido, {{ user?.name || 'Usuario' }}</h1>
      
      <button class="absolute right-0 top-0" @click="showOptions = true">
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#cfcfcf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#cfcfcf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13Z" stroke="#cfcfcf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </button>
    </div>

    <div class="mt-15 flex flex-col justify-evenly space-y-4 relative">
      <!-- Panel superior (Balance o resumen) -->
      <div class="border-2 border-rose-400 rounded-lg w-full h-40 flex items-center justify-center text-3xl text-rose-300">
        - ?
      </div>

      <!-- Contenedor intermedio -->
      <div class="border-2 border-rose-400 rounded-lg w-full h-24 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-rose-300 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <!-- Sección inferior (Agregar transacción) -->
      <div class="border-2 border-green-500 rounded-lg w-full h-16 flex items-center justify-center cursor-pointer hover:bg-green-800 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-300 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>