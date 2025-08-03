import { isAuthenticated } from '@/helpers/cookies'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useConfig } from '@/composables/useConfig'

// Guard para rutas protegidas
const { getConfig, config } = useConfig()
export async function requireAuth(
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {

  if (isAuthenticated()) {
    if (!config.account) {
      await getConfig()
    }
    next()
  } else {
    next({ name: 'Login' })
  }
}

// Guard para rutas públicas (redirigir si ya está autenticado)
export function requireGuest(
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  if (isAuthenticated()) {
    next({ name: 'Home' })
  } else {
    next()
  }
} 