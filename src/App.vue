<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import { useAuth } from './composables/useAuth'
import { Toaster } from 'vue-sonner'
const NavBar = defineAsyncComponent(() => import('./components/NavBar.vue'))

const { checkAuth, authenticated } = useAuth()
console.log('hecho');

checkAuth()  
</script>

<template>
  <Toaster richColors />
  <div class="w-full min-h-screen flex justify-center px-6 py-8">
    <main class="w-12/12 md:w-6/12 2xl:w-8/12">
        <router-view />
      <!-- <NavBar v-if="authenticated" /> -->
    </main>
  </div>
</template>

<style>
</style>
