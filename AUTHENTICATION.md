# Sistema de Autenticación - Money Move

## Descripción

Se ha implementado un sistema completo de autenticación para la aplicación Money Move con las siguientes características:

- **Guards de ruta**: Protección automática de rutas
- **Composable de autenticación**: Gestión centralizada del estado de auth
- **Persistencia de sesión**: Uso de localStorage para mantener la sesión
- **Navegación inteligente**: Redirección automática según el estado de autenticación

## Estructura de Archivos

```
src/
├── guards/
│   └── auth.ts              # Guards de autenticación
├── composables/
│   └── useAuth.ts           # Composable para gestión de auth
├── components/
│   └── NavBar.vue           # Barra de navegación con logout
├── views/
│   ├── LoginView.vue        # Vista de login actualizada
│   └── HomeView.vue         # Vista principal con auth
└── router/
    └── index.ts             # Configuración de rutas con guards
```

## Funcionalidades

### 1. Guards de Autenticación (`src/guards/auth.ts`)

- `requireAuth`: Protege rutas que requieren autenticación
- `requireGuest`: Redirige usuarios autenticados desde páginas públicas
- Funciones auxiliares para gestión de tokens

### 2. Composable de Autenticación (`src/composables/useAuth.ts`)

- `login(email, password)`: Función de inicio de sesión
- `logout()`: Función de cierre de sesión
- `checkAuth()`: Verificación de token al cargar la app
- Estado reactivo: `user`, `loading`, `error`, `authenticated`

### 3. Rutas Protegidas

**Rutas que requieren autenticación:**
- `/` (Home)
- `/list`
- `/edit/:id`
- `/report`

**Rutas públicas:**
- `/login`
- `/register`

## Uso

### Credenciales de Prueba

Para probar el sistema, usa estas credenciales:
- **Email**: `admin@example.com`
- **Password**: `password`

### Flujo de Autenticación

1. **Acceso inicial**: Si no hay token, redirige a `/login`
2. **Login exitoso**: Guarda token y redirige a `/`
3. **Navegación**: Las rutas protegidas verifican autenticación automáticamente
4. **Logout**: Elimina token y redirige a `/login`

### Integración con API Real

Para conectar con tu backend, modifica las funciones en `useAuth.ts`:

```typescript
// Reemplazar mockLoginAPI con tu llamada real
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})

// Reemplazar mockVerifyToken con tu verificación real
const userData = await fetch('/api/verify-token', {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

## Características Técnicas

- **TypeScript**: Tipado completo para mejor desarrollo
- **Vue 3 Composition API**: Uso moderno de Vue
- **Vue Router**: Navegación con guards
- **Tailwind CSS**: Estilos consistentes
- **LocalStorage**: Persistencia de sesión
- **Estado reactivo**: Actualización automática de UI

## Seguridad

- Tokens JWT simulados (reemplazar con implementación real)
- Verificación de autenticación en cada navegación
- Limpieza automática de sesión expirada
- Redirección automática para usuarios no autorizados 