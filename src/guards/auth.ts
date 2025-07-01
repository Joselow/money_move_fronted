import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

// Función para verificar si el usuario está autenticado
export function isAuthenticated(): boolean {
  const token = localStorage.getItem('authToken')
  return !!token
}

// Función para obtener el token de autenticación
export function getAuthToken(): string | null {
  return localStorage.getItem('authToken')
}

// Función para establecer el token de autenticación
export function setAuthToken(token: string): void {
  localStorage.setItem('authToken', token)
}

// Función para eliminar el token de autenticación (logout)
export function removeAuthToken(): void {
  localStorage.removeItem('authToken')
}

// Guard para rutas protegidas
export function requireAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  if (isAuthenticated()) {
    next()
  } else {
    next({ name: 'Login' })
  }
}

// Guard para rutas públicas (redirigir si ya está autenticado)
export function requireGuest(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  if (isAuthenticated()) {
    next({ name: 'Home' })
  } else {
    next()
  }
} 