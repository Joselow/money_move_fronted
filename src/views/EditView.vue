<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white p-4">
    <h2 class="text-xl font-bold mb-6">Editar Movimiento</h2>
    <form class="flex flex-col gap-4 w-full max-w-xs">
      <input type="number" placeholder="Monto" class="rounded p-3 bg-neutral-800 text-white" />
      <input type="text" placeholder="Descripción" class="rounded p-3 bg-neutral-800 text-white" />
      <button type="submit" class="bg-blue-600 hover:bg-blue-700 rounded py-3 font-semibold">Guardar Cambios</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
</script> 