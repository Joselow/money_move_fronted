<template>
  <div class="min-h-screen flex flex-col items-center bg-neutral-900 text-white p-4">
    <h2 class="text-xl font-bold mb-6">Reporte</h2>
    <form class="flex flex-col gap-4 w-full max-w-xs mb-6">
      <input type="date" class="rounded p-3 bg-neutral-800 text-white" />
      <input type="date" class="rounded p-3 bg-neutral-800 text-white" />
      <button type="submit" class="bg-green-600 hover:bg-green-700 rounded py-3 font-semibold">Filtrar</button>
    </form>
    <div class="bg-neutral-800 rounded p-4 w-full max-w-xs text-center">
      <div class="mb-2">Total: <span class="font-bold">$100.00</span></div>
      <button class="bg-blue-600 hover:bg-blue-700 rounded py-2 px-4 font-semibold mt-2">Exportar Excel</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script> 