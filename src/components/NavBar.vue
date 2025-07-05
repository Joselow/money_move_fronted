<template>
    <div class="page-container">
      <!-- Contenido de la página -->
      <slot />
  
      <!-- Barra de navegación inferior -->
      <nav
        class="navbar"
      >
        <button
          v-for="item in items"
          :key="item.id"
          @click="activeTab = item.id"
          class="nav-button"
          :class="activeTab === item.id ? 'active' : ''"
        >
          {{ item.label }}
        </button>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const items = [
    { id: 'informes', label: 'Informes' },
    { id: 'home', label: 'Home' },
    { id: 'historial', label: 'Historial' }
  ]
  
  const activeTab = ref('home')
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
  
  /* Contenedor general para dar espacio inferior */
  .page-container {
    padding-bottom: 80px; /* Espacio suficiente para la navbar */
  }
  
  /* Barra inferior */
  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    border-top: 1px solid #38bdf8; /* sky-400 */
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    border-radius: 1rem 1rem 0 0;
    z-index: 50;
  }
  
  /* Botones */
  .nav-button {
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid #38bdf8;
    background-color: transparent;
    color: #38bdf8;
    font-family: 'Patrick Hand', cursive;
    font-size: 1.125rem;
    transition: all 0.3s ease;
  }
  
  .nav-button:hover {
    background-color: #38bdf8;
    color: black;
  }
  
  .nav-button.active {
    background-color: #38bdf8;
    color: black;
  }
  </style>
  