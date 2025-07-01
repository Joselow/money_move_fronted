import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { setAuthToken, removeAuthToken, getAuthToken, isAuthenticated } from '../guards/auth'

export function useAuth() {
  const router = useRouter()
  const user = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed property para verificar si está autenticado
  const authenticated = computed(() => {
    // return true
    return isAuthenticated() && user.value !== null
  })

  // Función de login
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      // Aquí deberías hacer la llamada a tu API
      // Por ahora simulamos una respuesta exitosa
      const response = await mockLoginAPI(email, password)
      
      if (response.success && response.token) {
        setAuthToken(response.token)
        user.value = response.user
        router.push({ name: 'Home' })
      } else {
        error.value = response.message || 'Error desconocido'
      }
    } catch (err) {
      error.value = 'Error al iniciar sesión'
      console.error('Login error:', err)
    } finally {
      loading.value = false
    }
  }

  // Función de logout
  const logout = () => {
    removeAuthToken()
    user.value = null
    router.push({ name: 'Login' })
  }

  // Función para verificar el token al cargar la aplicación
  const checkAuth = async () => {
    const token = getAuthToken()
    if (token) {
      try {
        // Aquí deberías verificar el token con tu API
        const userData = await mockVerifyToken(token)
        if (userData) {
          user.value = userData
        } else {
          logout()
        }
      } catch (err) {
        console.error('Token verification error:', err)
        logout()
      }
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

// Funciones mock para simular la API
async function mockLoginAPI(email: string, password: string) {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simular validación básica
  if (email === 'admin@example.com' && password === 'password') {
    return {
      success: true,
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 1,
        email: email,
        name: 'Usuario Admin'
      }
    }
  } else {
    return {
      success: false,
      message: 'Credenciales inválidas'
    }
  }
}

async function mockVerifyToken(token: string) {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Simular verificación de token
  if (token.startsWith('mock-jwt-token-')) {
    return {
      id: 1,
      email: 'admin@example.com',
      name: 'Usuario Admin'
    }
  }
  return null
} 