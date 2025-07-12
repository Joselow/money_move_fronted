import axios from 'axios'
import { getAuthToken, removeAuthToken } from '../utils/cookies'

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar el token bearer automáticamente
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Si el token es inválido (401), eliminar el token y redirigir al login
    if (error.response?.status === 401) {
      removeAuthToken()
      // Redirigir al login si estamos en el navegador
      if (typeof window !== 'undefined') {
        // window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api 