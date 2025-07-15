import { isAuthenticated } from '@/helpers/cookies'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

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