<template>
  <div class="min-h-screen flex items-center justify-center px-2">
    <div class="w-full max-w-md p-8 rounded-2xl shadow-lg space-y-6 border border-gray-800">
      <!-- Título -->
      <h2 class="text-2xl font-bold text-center text-white tracking-wide">Crear Cuenta</h2>

      <!-- Formulario -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Nombre -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Nombre completo</label>
          <input
            v-model="name"
            type="text"
            id="name"
            required
            class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Tu nombre completo"
          />
        </div>

        <!-- Correo -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <!-- Contraseña -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <!-- Confirmar Contraseña -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-1">Confirmar contraseña</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            required
            class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <!-- Mensaje de error -->
        <div v-if="error" class="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-lg border border-red-800">
          {{ error }}
        </div>

        <!-- Botón -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center justify-center"
        >
          <span v-if="loading" class="mr-2">
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
        </button>

        <!-- Enlace a login -->
        <div class="text-center">
          <router-link to="/login" class="text-blue-400 hover:text-blue-300 text-sm">
            ¿Ya tienes cuenta? Inicia sesión
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { setAuthToken } from '../guards/auth'
import { authService } from '../services/authService'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

async function handleRegister() {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Todos los campos son requeridos'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await authService.register({
      name: name.value,
      email: email.value,
      password: password.value
    })

    if (response.success && response.token) {
      setAuthToken(response.token)
      // Redirigir al home después del registro exitoso
      window.location.href = '/'
    } else {
      error.value = response.message || 'Error al registrar usuario'
    }
  } catch (err: any) {
    error.value = err.message || 'Error al registrar usuario'
    console.error('Register error:', err)
  } finally {
    loading.value = false
  }
}
</script> 