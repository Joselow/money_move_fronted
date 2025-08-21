<script setup lang="ts">
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const { push, back   } = useRouter()

const items = [
  { 
    id: 'back', 
    label: '<i class="pi pi-arrow-left"></i>' ,
    fn: () => {
      back()
    }
  },     
  
  { 
    id: 'home', 
    label: '<i class="pi pi-home"></i>' ,
    fn: () => {
      push({ name: 'Home' })

    }
  },
  { 
    id: 'historial', 
    label: '<i class="pi pi-list-check"></i>' ,
    fn: () => {
      push({ name: 'List' })

    }
  }
]

const activeTab = ref('home')

const handleClick = async (id: string) => {
  activeTab.value = id

  const item = items.find(item => item.id === id)
  if (!item) return
  item.fn()

}


</script>
<template>
    <div class="page-container ">
      <!-- Contenido de la página -->
      <slot />
  
      <!-- Barra de navegación inferior -->
      <nav
        class="navbar bg-neutral-950" 
      >
        <button
          v-for="item in items"
          :key="item.id"
          @click="handleClick(item.id)"
          class="nav-button"
          :class="activeTab === item.id ? 'active' : ''"
        >
          <span class="text-2xl inline-block" v-html="item.label"></span>
        </button>
      </nav>
    </div>
  </template>
  

  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
  

  /* Contenedor general para dar espacio inferior */
  /* .page-container {
    padding-bottom: 10px; Espacio suficiente para la navbar 
  } */
  
  /* Barra inferior */
  .navbar {
    margin: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: 00000075;
    border: 1px solid #717171; /* sky-400 */
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    border-radius: 1rem;
    z-index: 20;
  }
  
  /* Botones */
  .nav-button {
    padding: 4px 1rem;
    border-radius: 0.75rem;
    border: 1px solid #454545;
    background-color: transparent;
    color: #717171;
    /* font-family: 'Patrick Hand', cursive; */
    transition: all 0.2s ease;
  }
  
  .nav-button:hover {
    background-color: #717171;
    color: black;
  }
  
  .nav-button.active {
    background-color: #cbcbcb;
    color: black;
    scale: 1.2;
  }
  </style>
  