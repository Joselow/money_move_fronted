<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'

const NavBar = defineAsyncComponent(() => import('./components/NavBar.vue'))
const FullScreenOptions = defineAsyncComponent(() => import('./components/FullScreenOptions.vue'))

import { useAuth } from './composables/useAuth'
import { Toaster } from 'vue-sonner'

const { checkAuth, authenticated } = useAuth()

checkAuth() 
const showOptions = ref(false)

</script>

<template>
  <Toaster richColors position="top-right" />
  <div class="w-full min-h-screen flex justify-center px-6 py-7">
    <main class="w-12/12 md:w-6/12 2xl:w-8/12 relative">
      <template v-if="authenticated">
          <FullScreenOptions v-model="showOptions"/>
          <button class="z-50 absolute right-0 top-0" @click="showOptions = true">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                  stroke="#cfcfcf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path
                  d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                  stroke="#cfcfcf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path
                  d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13Z"
                  stroke="#cfcfcf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </svg>
          </button> 
        </template>

        <router-view />
        <NavBar v-if="authenticated" />
    </main>
  </div>
</template>

<style>
</style>
