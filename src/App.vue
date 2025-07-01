<script lang="ts" setup>
import { onMounted } from 'vue'
import { useAuth } from './composables/useAuth'

const { checkAuth } = useAuth()

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <div class="w-full min-h-screen ">
    <main class="px-6 py-8">
      <router-view />
    </main>
  </div>
</template>

<style>
</style>
