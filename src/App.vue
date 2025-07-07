<script lang="ts" setup>
import { onMounted, defineAsyncComponent } from 'vue'
import { useAuth } from './composables/useAuth'

const NavBar = defineAsyncComponent(() => import('./components/NavBar.vue'))

const { checkAuth } = useAuth()

onMounted(() => {
  console.log('App mounted');
  
  checkAuth()  
})
</script>

<template>
  <div class="w-full min-h-screen ">
    <main class="px-6 py-8">
      <router-view />
      <!-- <NavBar v-if="authenticated" /> -->
    </main>
  </div>
</template>

<style>
</style>
