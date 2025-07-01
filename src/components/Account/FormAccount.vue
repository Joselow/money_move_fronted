<script setup lang="ts">
import { ref } from 'vue'
import { useAccount } from '../../composables/useAccount'

const { createAccount, loading, error } = useAccount()

const name = ref('')
const description = ref('')
const currency = ref('S/')
const initialBalance = ref(0)

const emit = defineEmits(['created'])

async function handleSubmit() {
  if (!name.value) return

  console.log('crea');
  

const account = await createAccount({
    name: name.value,
    description: description.value || undefined,
    currency: currency.value,
    initialBalance: initialBalance.value.toString()
})
emit('created', account)
// Limpiar formulario
name.value = ''
description.value = ''
currency.value = 'S/'
initialBalance.value = 0
 
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 w-full">
    <div>
      <label class="block text-sm font-medium text-gray-200 mb-1">Nombre *</label>
      <input v-model="name" required class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500" placeholder="Nombre de la cuenta" />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-200 mb-1">Descripción</label>
      <input v-model="description" class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500" placeholder="Descripción (opcional)" />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-200 mb-1">Moneda</label>
      <input v-model="currency" class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500" placeholder="S/" />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-200 mb-1">Monto inicial</label>
      <input v-model.number="initialBalance" type="number" min="0" class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500" placeholder="0" />
    </div>
    <div v-if="error" class="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded-lg border border-red-800">{{ error }}</div>
    <button type="submit" :disabled="loading || !name" class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition duration-200">
      {{ loading ? 'Creando...' : 'Crear cuenta' }}
    </button>
  </form>
</template> 