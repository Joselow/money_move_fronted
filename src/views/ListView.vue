<template>
  <div class="min-h-screen flex flex-col items-center bg-neutral-900 text-white p-4">
    <h2 class="text-xl font-bold mb-6">Movimientos</h2>
    <input type="text" placeholder="Buscar..." class="rounded p-3 bg-neutral-800 text-white mb-4 w-full max-w-xs" />
    <div class="flex flex-col gap-2 w-full max-w-xs">
      <!-- Aquí irá la lista de movimientos -->
      <div class="bg-neutral-800 rounded p-3 flex justify-between items-center">
        <span>Ingreso</span>
        <span>$50.00</span>
      </div>
      <div class="bg-neutral-800 rounded p-3 flex justify-between items-center">
        <span>Salida</span>
        <span>-$20.00</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script> 