import axios from 'axios'
import { getAuthToken, removeAuthToken } from '../helpers/cookies'
import { handleErrors } from '@/helpers/handleErrors'

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

    const status = error.response?.status

    handleErrors(status)
    return Promise.reject(error)
  }
)

export default api 