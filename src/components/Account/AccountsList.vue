<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAccount } from '../../composables/useAccount'
import { useConfig } from '../../composables/useConfig'
import FullScreenLoader from '../../commons/FullScreenLoader.vue'
import type { Account } from '../../interfaces'

const { loadingAccounts, error } = useAccount()
const { config, selectAccount } = useConfig()

const currentPage = ref(1)
const itemsPerPage = ref(3)
const scrollContainer = ref<HTMLElement>()

const props = defineProps<{
  accounts: Account[]
}>()

const emit = defineEmits(['accountSelected', 'close'])

const paginatedAccounts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return props.accounts.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(props.accounts.length / itemsPerPage.value)
})

const canScrollLeft = computed(() => currentPage.value > 1)
const canScrollRight = computed(() => currentPage.value < totalPages.value)

const handleAccountSelect = (account: Account) => {
  selectAccount(account)
  emit('accountSelected', account)
  emit('close')
}

const scrollLeft = () => {
  if (canScrollLeft.value) {
    currentPage.value--
    scrollToPage()
  }
}

const scrollRight = () => {
  if (canScrollRight.value) {
    currentPage.value++
    scrollToPage()
  }
}

const scrollToPage = () => {
  if (scrollContainer.value) {
    const container = scrollContainer.value
    const cardWidth = container.scrollWidth / itemsPerPage.value
    const scrollPosition = (currentPage.value - 1) * cardWidth
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  if (scrollContainer.value) {
    const container = scrollContainer.value
    const cardWidth = container.scrollWidth / itemsPerPage.value
    const currentScroll = container.scrollLeft
    const newPage = Math.round(currentScroll / cardWidth) + 1
    if (newPage !== currentPage.value && newPage >= 1 && newPage <= totalPages.value) {
      currentPage.value = newPage
    }
  }
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-6">
    <FullScreenLoader v-if="loadingAccounts" />
    
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-white"><i class="pi pi-file-edit"></i> Selecciona la cuenta</h2>
      <button 
        @click="$emit('close')"
        class="text-gray-400 hover:text-white transition-colors"
      >
        <i class="pi pi-times text-xl" />
      </button>
    </div>

    <!-- Error message -->
    <div v-if="error" class="mb-4 p-4 bg-red-900/20 border border-red-800 rounded-lg">
      <p class="text-red-400 text-sm">{{ error }}</p>
    </div>

    <!-- Accounts container -->
    <div class="relative">
      <!-- Scroll left button -->
      <button
        v-if="canScrollLeft"
        @click="scrollLeft"
        class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent hover:bg-pink-200/10 text-pink-400 p-2 rounded-full shadow-lg transition-all duration-200 border-2 border-pink-400"
        style="width: 48px; height: 48px; font-size: 2rem; display: flex; align-items: center; justify-content: center;"
      >
        <span style="font-size: 2.5rem;">&#8592;</span>
      </button>

      <!-- Scroll right button -->
      <button
        v-if="canScrollRight"
        @click="scrollRight"
        class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent hover:bg-pink-200/10 text-pink-400 p-2 rounded-full shadow-lg transition-all duration-200 border-2 border-pink-400"
        style="width: 48px; height: 48px; font-size: 2rem; display: flex; align-items: center; justify-content: center;"
      >
        <span style="font-size: 2.5rem;">&#8594;</span>
      </button>

      <!-- Accounts scroll container -->
      <div
        ref="scrollContainer"
        @scroll="handleScroll"
        class="flex gap-4 justify-center overflow-x-auto scrollbar-hide pb-4"
        style="scroll-snap-type: x mandatory;"
      >
        <div
          v-for="account in paginatedAccounts"
          :key="account.id"
          @click="handleAccountSelect(account)"
          class=" flex-shrink-0 w-80 bg-gray-800 border-2 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-all duration-200"
          :class="[config.account?.id === account.id ? 'bg-indigo-900/20' : '']"
          style="scroll-snap-align: start;"
        >
          <!-- Account header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <i class="pi pi-address-book text-blue-400" />
              <h3 class="text-lg font-semibold text-white">{{ account.name }}</h3>
            </div>
            <div 
              v-if="config.account?.id === account.id"
              class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs animate-bounce"
            >
                <i class="pi pi-check"></i>
              Activa
            </div>
          </div>

          <!-- Account details -->
          <div class="space-y-3">
            <div v-if="account.description" class="text-gray-400 text-sm">
              {{ account.description }}
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-gray-400 text-sm">Balance:</span>
              <span class="text-xl font-bold text-white">
                {{ account.currency }} {{ parseFloat(account.totalBalance).toFixed(2) }}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-gray-400 text-sm">Moneda:</span>
              <span class="text-white font-medium">{{ account.currency }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-gray-400 text-sm">Creada:</span>
              <span class="text-white text-sm">
                {{ new Date(account.createdAt).toLocaleDateString() }}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Pagination indicators -->
    <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-6">
      <button
        @click="scrollLeft"
        :disabled="!canScrollLeft"
        class="p-2 rounded-full transition-colors border-2 border-pink-400 text-pink-400 bg-transparent hover:bg-pink-200/10"
        :class="canScrollLeft ? '' : 'opacity-50 cursor-not-allowed'"
        style="width: 32px; height: 32px; font-size: 1.5rem; display: flex; align-items: center; justify-content: center;"
      >
        <span style="font-size: 1.5rem;">&#8592;</span>
      </button>
      
      <div class="flex space-x-1">
        <div
          v-for="page in totalPages"
          :key="page"
          class="w-2 h-2 rounded-full transition-colors"
          :class="page === currentPage ? 'bg-pink-400' : 'bg-gray-600'"
        />
      </div>
      
      <button
        @click="scrollRight"
        :disabled="!canScrollRight"
        class="p-2 rounded-full transition-colors border-2 border-pink-400 text-pink-400 bg-transparent hover:bg-pink-200/10"
        :class="canScrollRight ? '' : 'opacity-50 cursor-not-allowed'"
        style="width: 32px; height: 32px; font-size: 1.5rem; display: flex; align-items: center; justify-content: center;"
      >
        <span style="font-size: 1.5rem;">&#8594;</span>
      </button>
    </div>

    <!-- Empty state -->
    <div v-if="!loadingAccounts && accounts.length === 0" class="text-center py-8">
      <i class="pi pi-address-book text-4xl text-gray-600 mb-4" />
      <p class="text-gray-400">No tienes cuentas creadas</p>
      <p class="text-gray-500 text-sm">Crea tu primera cuenta para comenzar</p>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style> 