<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white p-4">
    <h1 class="text-2xl font-bold mb-8">Gestión</h1>
    <div class="flex flex-col gap-4 w-full max-w-xs">
      <router-link to="/register?type=income" class="bg-green-600 hover:bg-green-700 rounded py-3 text-center font-semibold">Registrar Ingreso</router-link>
      <router-link to="/register?type=expense" class="bg-red-600 hover:bg-red-700 rounded py-3 text-center font-semibold">Registrar Salida</router-link>
      <router-link to="/list" class="bg-neutral-800 hover:bg-neutral-700 rounded py-3 text-center font-semibold">Ver Movimientos</router-link>
      <router-link to="/report" class="bg-neutral-800 hover:bg-neutral-700 rounded py-3 text-center font-semibold">Reporte</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script> 