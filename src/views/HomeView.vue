<script setup lang="ts">
import { ref, toRefs } from 'vue'
import FullScreenOptions from '../components/FullScreenOptions.vue'
import CommonLoader from '@/commons/CommonLoader.vue'

import { useAuth } from '../composables/useAuth'
import { useConfig } from '../composables/useConfig'
import { useDate } from '@/composables/useDate'
import { useTransaction } from '@/composables/useTransaction'

import { formatDate } from '@/utils/date'
import { formatCurrency } from '@/utils/format'

const { user } = useAuth()
const { config } = useConfig()

const { getTotalTransactions, dailyInflows, dailyOutflows, loading } = useTransaction()

const { targetDate, updateTargetDate, dateInput, resetDate } = useDate()

const { account } = toRefs(config)

const showOptions = ref(false)

const start = async () => {
  if (config.account) {
    getTotalTransactions()
  }
}

start()

const updateDate = async (e: Event) => {
  const target = e.target as HTMLInputElement

  if (target.value) {
    updateTargetDate(target.value)
  } else {
    resetDate()
  }
  getTotalTransactions()
}

const changeDate = async () => {
  if (!dateInput.value) return
  dateInput.value.showPicker()
}

</script>

<template>
  <CommonLoader v-if="loading" />

  <FullScreenOptions v-model="showOptions" />

  <div class="text-white">
    <div class=" w-full relative">
      <div>
        <h1 class="text-2xl font-bold tracking-wider">Resumen del día</h1>
        <div class="mt-2">
          <p class="text-sm text-gray-400" v-if="account">
            <i class="pi pi-address-book" /> {{ account?.name }}
          </p>
          <p class="text-sm text-gray-400" v-if="user">
            <i class="pi pi-user" /> {{ user?.name }}
          </p>
        </div>
        <h1 class="py-4 text-2xl font-bold tracking-wider text-center">
          <span @click="changeDate">
            <i class="pi pi-calendar" /> {{ formatDate(targetDate ?? '') }}
          </span>
        </h1>
        <input ref="dateInput" type="date" v-model="targetDate" @change="updateDate" class="hidden" />
      </div>
    </div>

    <div class="mt-2 flex flex-col justify-evenly space-y-4 relative">
      <router-link :to="{ name: 'List' }" class="block group">
        <div class="rounded-2xl p-[2px] bg-gradient-to-r from-green-500 via-neutral-500 to-rose-500 transition-opacity group-hover:opacity-90">
          <div class="rounded-[14px] bg-neutral-950 py-6 px-5">
            <div class="grid grid-cols-2 gap-6">
              <div class="flex flex-col items-center justify-center gap-2">
                <i class="pi pi-arrow-up-right text-2xl text-green-400" />
                <p class="text-xs uppercase tracking-widest text-neutral-400 font-medium">Ingresos</p>
                <p class="text-2xl font-bold text-green-400 leading-none">
                  {{ account?.currency }} {{ formatCurrency(dailyInflows) }}
                </p>
              </div>
              <div class="flex flex-col items-center justify-center gap-2">
                <i class="pi pi-arrow-down-left text-2xl text-rose-400" />
                <p class="text-xs uppercase tracking-widest text-neutral-400 font-medium">Salidas</p>
                <p class="text-2xl font-bold text-rose-400 leading-none">
                  {{ account?.currency }} {{ formatCurrency(dailyOutflows) }}
                </p>
              </div>
            </div>
            <p class="mt-4 text-center text-[11px] text-neutral-600 group-hover:text-neutral-400 transition-colors">
              Ver transacciones <i class="pi pi-angle-right text-[10px]"></i>
            </p>
          </div>
        </div>
      </router-link>

      <router-link :to="{ name: 'Outflow' }">
        <div class="border-2 border-rose-400 rounded-2xl w-full h-24 flex items-center justify-center hover:bg-rose-800/10">
          <svg class="" style="color: #ff5f7a;" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
            <path  d="M4 8.5A3.5 3.5 0 0 1 7.5 5h10A2.5 2.5 0 0 1 20 7.5V16a3 3 0 0 1-3 3H7.5A3.5 3.5 0 0 1 4 15.5z"/>
            <path d="M20 9h-4.2a2 2 0 0 0 0 4H20"/>
            <path d="M16.2 11h.01"/>
            <path d="M9 12H3"/>
            <path d="M6 9l-3 3 3 3"/>
          </svg>
        </div>
      </router-link>

      <router-link :to="{ name: 'Inflow' }">
        <div
          class="border-2 border-green-500 rounded-2xl w-full h-18 flex items-center justify-center cursor-pointer hover:bg-green-800/10 transition">

          <svg class="text-green-400/80 -scale-x-100" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
            <path  d="M4 8.5A3.5 3.5 0 0 1 7.5 5h10A2.5 2.5 0 0 1 20 7.5V16a3 3 0 0 1-3 3H7.5A3.5 3.5 0 0 1 4 15.5z"/>
            <path d="M20 9h-4.2a2 2 0 0 0 0 4H20"/>
            <path d="M16.2 11h.01"/>
            <path d="M9 12H3"/>
            <path d="M6 9l-3 3 3 3"/>
          </svg>
         
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
