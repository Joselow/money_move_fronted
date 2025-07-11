import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { setAuthToken, removeAuthToken, getAuthToken, isAuthenticated } from '../utils/cookies'
import { authService } from '../services/authService'

const user = ref<any>(null)

const startAuth = async () => {
  const token = getAuthToken()
  if (token) {
    const response = await authService.getCurrentUser()
    user.value = response.user
  }
}

startAuth()

export function useAuth() {
  
  const router = useRouter()
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed property para verificar si está autenticado
  const authenticated = computed(() => {
    // return true
    console.log(isAuthenticated(), user.value);
    
    return isAuthenticated() && user.value !== null
  })

  // Función de login
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await authService.login({ email, password })
      
      if (response.success && response.token) {
        setAuthToken(response.token)
        user.value = response.user
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

  // Función de logout
  const logout = async () => {
      removeAuthToken()
      user.value = null
      router.push({ name: 'Login' })
  }

  // Función para verificar el token al cargar la aplicación
  const checkAuth = async () => {
    const logged = isAuthenticated() && user.value !== null

    if (!logged) {
      logout() 
    }
  }

  return {
    user,
    loading,
    error,
    authenticated,
    login,
    logout,
    checkAuth
  }
} 