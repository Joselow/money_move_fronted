<script lang="ts" setup>

</script> 
<template>
  <div class="min-h-screen text-white">
    <h2 class="text-xl font-bold mb-6">Reporte</h2>
    
    <form>
      <div class="mb-2">
          <label for="month" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mes</label>
          <input type="month" id="month" class="text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div> 
    
        <div class="grid gap-2 mb-6 md:grid-cols-2">
            <div>
                <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha inicial</label>
                <input type="date" id="startDate" class="text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div>
                <label for="endDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha final</label>
                <input type="date" id="endDate" class="text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Filtrar
        </button>
    </form>

    <div class="p-4  text-center">
     
    </div>
  </div>
</template>

