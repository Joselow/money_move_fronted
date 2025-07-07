import Cookies from 'js-cookie'

const TOKEN_KEY = 'auth_token'

// Función para verificar si el usuario está autenticado
export function isAuthenticated(): boolean {
  const token = Cookies.get(TOKEN_KEY)
  return !!token
}

// Función para obtener el token de autenticación
export function getAuthToken(): string | null {
  return Cookies.get(TOKEN_KEY) || null
}

// Función para establecer el token de autenticación
export function setAuthToken(token: string): void {
  Cookies.set(TOKEN_KEY, token, { 
    expires: 1, // 1 día
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
}

// Función para eliminar el token de autenticación (logout)
export function removeAuthToken(): void {
  Cookies.remove(TOKEN_KEY)
}