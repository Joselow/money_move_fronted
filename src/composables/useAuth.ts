import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { setAuthToken, getAuthToken, isAuthenticated, removeAuthToken } from '../helpers/cookies'
import { authService } from '../services/authService'

const user = ref<any>(null)
const authReady = ref(false)

// Una sola instancia compartida: todos los componentes reaccionan al mismo estado
const authenticated = computed(() => {
  console.log('isAuthenticated', isAuthenticated())
  return user.value !== null && isAuthenticated()
})

export function useAuth() {
  const router = useRouter()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await authService.login({ email, password })

      if (response.success && response.token) {
        setAuthToken(response.token)
        user.value = response.user
        authReady.value = true
        router.push({ name: 'Home' })
      } else {
        error.value = response.message || 'Error desconocido'
      }
    } catch (err: any) {
      error.value = err.message || 'Error al iniciar sesión'
      console.error('Login error:', err)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    removeAuthToken()
    user.value = null
    router.push({ name: 'Login' })
  }

  const checkAuth = async () => {
    const token = getAuthToken()

    if (!token) {
      authReady.value = true
      return
    }

    try {
      const response = await authService.getCurrentUser()

      if (!response.success || !response.user) {
        removeAuthToken()
        user.value = null
        return
      }

      user.value = response.user
    } catch (err) {
      console.error('Token verification error:', err)
      removeAuthToken()
      user.value = null
    } finally {
      authReady.value = true
    }
  }

  return {
    user,
    loading,
    error,
    authReady,
    authenticated,
    login,
    logout,
    checkAuth
  }
}
