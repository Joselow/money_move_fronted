<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Fondo oscuro -->
    <div class="absolute inset-0 bg-black/90 bg-opacity-70 transition-opacity" @click="close"></div>
    <!-- Contenido de opciones -->
    <div class="relative z-10 w-full max-w-xs mx-auto bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col space-y-6  animate-fade-in">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.2s ease;
}
</style> 