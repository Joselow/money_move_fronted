<script setup lang="ts">
import { reactive, watch } from 'vue'

import ScrollX from '@/commons/ScrollX.vue'
import type { Category, TransactionType } from '@/interfaces'

interface Props {
  categories: Category[]
  filters: {
    startDate: string
    endDate: string
    categoryId: number | null
    type: TransactionType | null
  }
}

interface Emits {
    ['update:filters']: [filters: Partial<Props['filters']>],
    ['clear-filters']: [void]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Local reactive copy of filters
const localFilters = reactive({
  startDate: props.filters.startDate,
  endDate: props.filters.endDate,
  categoryId: props.filters.categoryId,
  type: props.filters.type
})

// Watch for external filter changes
watch(() => props.filters, (newFilters) => {
  Object.assign(localFilters, newFilters)
}, { deep: true })

const updateFilters = () => {
  emit('update:filters', { ...localFilters })
}

const selectType = (type: TransactionType | null) => {
  localFilters.type = type
  updateFilters()
}

const selectCategory = (categoryId: number | null) => {
  localFilters.categoryId = categoryId
  updateFilters()
}

const clearAllFilters = () => {
  localFilters.startDate = ''
  localFilters.endDate = ''
  localFilters.categoryId = null
  localFilters.type = null
  emit('clear-filters')
}
</script>

<template>
  <div class="bg-neutral-800 rounded-xl p-4 mb-4 space-y-4">
    <!-- Date Range Filters -->
    <div class="space-y-2">
      <label class="text-sm font-medium text-neutral-300">Rango de Fechas</label>
      <div class="flex gap-2">
        <input
          v-model="localFilters.startDate"
          type="date"
          class="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          @change="updateFilters"
        />
        <input
          v-model="localFilters.endDate"
          type="date"
          class="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          @change="updateFilters"
        />
      </div>
    </div>

    <!-- Transaction Type Filter -->
    <div class="space-y-2">
      <label class="text-sm font-medium text-neutral-300">Tipo de Transacción</label>
      <div class="flex gap-2">
        <button
          @click="selectType(null)"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-all duration-200',
            localFilters.type === null 
              ? 'bg-blue-500 text-white' 
              : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
          ]"
        >
          Todos
        </button>
        <button
          @click="selectType('1')"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-all duration-200',
            localFilters.type === '1' 
              ? 'bg-green-500 text-white' 
              : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
          ]"
        >
          Ingresos
        </button>
        <button
          @click="selectType('0')"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-all duration-200',
            localFilters.type === '0' 
              ? 'bg-red-500 text-white' 
              : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
          ]"
        >
          Gastos
        </button>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="space-y-2">
      <label class="text-sm font-medium text-neutral-300">Categorías</label>
      <ScrollX class="mt-1">
        <div class="flex gap-2">
          <div
            @click="selectCategory(null)"
            :class="[
              'px-4 py-2 border-2 rounded-full text-white cursor-pointer whitespace-nowrap transition-all duration-300 transform hover:scale-105',
              localFilters.categoryId === null 
                ? 'bg-blue-500 border-blue-500' 
                : 'border-neutral-600 hover:border-neutral-500'
            ]"
          >
            Todas
          </div>
          <template v-for="category in categories" :key="category.id">
            <div
              @click="selectCategory(category.id)"
              :class="[
                'px-4 py-2 border-2 rounded-full text-white cursor-pointer whitespace-nowrap transition-all duration-300 transform hover:scale-105',
                localFilters.categoryId === category.id 
                  ? 'ring-2 ring-offset-2 ring-offset-neutral-800' 
                  : 'border-neutral-600'
              ]"
              :style="{
                'border-color': category.color,
                'background-color': localFilters.categoryId === category.id ? `${category.color}40` : ''
              }"
            >
              {{ category.name }}
            </div>
          </template>
        </div>
      </ScrollX>
    </div>

    <!-- Clear Filters Button -->
    <div class="flex justify-end">
      <button
        @click="clearAllFilters"
        class="px-4 py-2 text-sm bg-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-600 transition-colors"
      >
        Limpiar Filtros
      </button>
    </div>
  </div>
</template>
