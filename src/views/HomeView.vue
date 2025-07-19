<script setup lang="ts">
import { ref, toRefs } from 'vue'
import FullScreenOptions from '../components/FullScreenOptions.vue'
import CommonLoader from '@/commons/CommonLoader.vue'

import { useAuth } from '../composables/useAuth'
import { useConfig } from '../composables/useConfig'
import { useDate } from '@/composables/useDate'
import { useTransaction } from '@/composables/useTransaction'
import { useStyles } from '@/composables/useStyles'

import { formatDate } from '@/utils/date'
import { formatCurrency } from '@/utils/format'

const { user } = useAuth()
const { config, getConfig } = useConfig()

const { getTotalTransactions, totalTransaction, loading } = useTransaction()
const { styles } = useStyles({ total: totalTransaction })

const { targetDate, updateTargetDate, dateInput, resetDate } = useDate()

const { account } = toRefs(config)
// getConfig()

const showOptions = ref(false)

getTotalTransactions()

const updateDate = async (e: Event) => {
  const target = e.target as HTMLInputElement

  console.log(target.value);
  
  if (!target.value) {
    console.log('poerque resetea');
    
    // resetDate()
  }

  updateTargetDate(target.value)
  console.log(targetDate.value);
  getTotalTransactions()
  console.log(targetDate.value);

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
        <h1 class="text-2xl font-bold tracking-wider">Resumen del dia</h1>
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

      <button class="absolute right-0 top-0" @click="showOptions = true">
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
    </div>

    <div class="mt-2 flex flex-col justify-evenly space-y-4 relative">
      <!-- Panel superior (Balance o resumen) -->
      <router-link :to="{ name: 'List' }">
        <div
          class="border-2 rounded-lg w-full h-40 flex items-center justify-center text-5xl "
          :class="`${styles.border} ${styles.color}`"
          >
            {{ account?.currency }} {{ formatCurrency(totalTransaction) }}
        </div>
      </router-link>


      <router-link :to="{ name: 'Outflow' }">
        <!-- Contenedor intermedio -->
        <div class="border-2 border-rose-400 rounded-lg w-full h-24 flex items-center justify-center ">
          <i class="pi pi-angle-down text-2xl me-4 text-red-400 animate-bounce"></i>
          <svg class="animate-pulse" height="64px" width="64px" version="1.1" id="Layer_1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
            xml:space="preserve" fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path style="fill:#B3404A;"
                  d="M497.577,428.051h-83.695c-7.964,0-14.423-6.459-14.423-14.423s6.459-14.423,14.423-14.423h69.272 V112.795H193.505c-7.964,0-14.423-6.459-14.423-14.423s6.459-14.423,14.423-14.423h304.072c7.964,0,14.423,6.459,14.423,14.423 v315.257C512,421.594,505.543,428.051,497.577,428.051z">
                </path>
                <path style="fill:#B3404A;"
                  d="M320.362,428.051H14.423C6.459,428.051,0,421.593,0,413.628V98.372 c0-7.964,6.459-14.423,14.423-14.423h91.573c7.964,0,14.423,6.459,14.423,14.423s-6.459,14.423-14.423,14.423h-77.15v286.411 h291.517c7.964,0,14.423,6.459,14.423,14.423S328.328,428.051,320.362,428.051z">
                </path>
              </g>
              <path style="fill:#F4B2B0;"
                d="M426.394,195.161c-17.52,0-31.772-14.253-31.772-31.772c0-7.976-6.466-14.442-14.442-14.442H131.82 c-7.976,0-14.442,6.466-14.442,14.442c0,17.52-14.253,31.772-31.772,31.772c-7.976,0-14.442,6.466-14.442,14.442v92.796 c0,7.976,6.466,14.442,14.442,14.442c17.52,0,31.772,14.253,31.772,31.772c0,7.976,6.466,14.442,14.442,14.442h248.36 c7.976,0,14.442-6.466,14.442-14.442c0-17.52,14.253-31.772,31.772-31.772c7.976,0,14.442-6.466,14.442-14.442v-92.796 C440.836,201.627,434.369,195.161,426.394,195.161z">
              </path>
              <g>
                <path style="fill:#B3404A;"
                  d="M86.52,293.285v-74.568c23.894-5.498,42.738-24.352,48.238-48.246H279.38 c7.964,0,14.423-6.459,14.423-14.423s-6.459-14.423-14.423-14.423H121.975c-7.964,0-14.423,6.459-14.423,14.423 c0,19.55-15.904,35.454-35.454,35.454c-7.964,0-14.423,6.459-14.423,14.423v100.151c0,7.964,6.459,14.423,14.423,14.423 c19.55,0,35.454,15.904,35.454,35.454c0,7.964,6.459,14.423,14.423,14.423s14.423-6.459,14.423-14.423 C136.398,325.455,115.053,299.849,86.52,293.285z">
                </path>
                <path style="fill:#B3404A;"
                  d="M439.903,191.501c-19.55,0-35.454-15.904-35.454-35.454c0-7.964-6.459-14.423-14.423-14.423 s-14.423,6.459-14.423,14.423c0,30.499,21.345,56.104,49.877,62.669v74.568c-23.894,5.498-42.738,24.352-48.238,48.246H227.945 c-7.964,0-14.423,6.459-14.423,14.423s6.459,14.423,14.423,14.423h162.081c7.964,0,14.423-6.459,14.423-14.423 c0-19.55,15.904-35.454,35.454-35.454c7.964,0,14.423-6.459,14.423-14.423V205.924 C454.326,197.959,447.867,191.501,439.903,191.501z">
                </path>
                <path style="fill:#B3404A;"
                  d="M264.68,247.848V217.01c12.309,2.159,14.16,8.983,14.439,12.994c0.071,1.028,0.92,1.823,1.95,1.823 h13.444c1.129,0,2.018-0.955,1.96-2.083c-0.873-16.914-12.466-27.797-31.792-30.241v-10.37c0-1.082-0.877-1.957-1.957-1.957 h-13.444c-1.082,0-1.957,0.877-1.957,1.957v10.37c-20.11,2.543-31.846,14.221-31.846,32.323s11.736,29.78,31.846,32.323v30.838 c-12.309-2.159-14.16-8.983-14.439-12.994c-0.071-1.028-0.92-1.823-1.95-1.823h-13.444c-1.129,0-2.018,0.955-1.96,2.083 c0.873,16.914,12.466,27.796,31.792,30.241v10.37c0,1.082,0.877,1.957,1.957,1.957h13.444c1.082,0,1.957-0.877,1.957-1.957v-10.37 c20.11-2.543,31.846-14.221,31.846-32.323C296.524,262.069,284.788,250.392,264.68,247.848z M247.322,246.644 c-14.485-2.54-14.488-11.538-14.488-14.817c0-3.277,0.003-12.277,14.488-14.817V246.644z M264.68,294.99v-29.633 c14.485,2.54,14.488,11.54,14.488,14.817C279.166,283.45,279.163,292.45,264.68,294.99z">
                </path>
              </g>
            </g>
          </svg>
        </div>
      </router-link>

      <router-link :to="{ name: 'Inflow' }">

        <!-- Sección inferior (Agregar transacción) -->
        <div
          class="border-2 border-green-500 rounded-lg w-full h-16 flex items-center justify-center cursor-pointer hover:bg-green-800 transition">
          <i class="pi pi-angle-up text-2xl me-6 text-green-400 animate-pulse"></i>

          <svg height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path style="fill:#41b454;"
                  d="M497.577,428.051h-83.695c-7.964,0-14.423-6.459-14.423-14.423s6.459-14.423,14.423-14.423h69.272 V112.795H193.505c-7.964,0-14.423-6.459-14.423-14.423s6.459-14.423,14.423-14.423h304.072c7.964,0,14.423,6.459,14.423,14.423 v315.257C512,421.594,505.543,428.051,497.577,428.051z">
                </path>
                <path style="fill:#41b454;"
                  d="M320.362,428.051H14.423C6.459,428.051,0,421.593,0,413.628V98.372 c0-7.964,6.459-14.423,14.423-14.423h91.573c7.964,0,14.423,6.459,14.423,14.423s-6.459,14.423-14.423,14.423h-77.15v286.411 h291.517c7.964,0,14.423,6.459,14.423,14.423S328.328,428.051,320.362,428.051z">
                </path>
              </g>
              <path style="fill:#aef4d3;"
                d="M426.394,195.161c-17.52,0-31.772-14.253-31.772-31.772c0-7.976-6.466-14.442-14.442-14.442H131.82 c-7.976,0-14.442,6.466-14.442,14.442c0,17.52-14.253,31.772-31.772,31.772c-7.976,0-14.442,6.466-14.442,14.442v92.796 c0,7.976,6.466,14.442,14.442,14.442c17.52,0,31.772,14.253,31.772,31.772c0,7.976,6.466,14.442,14.442,14.442h248.36 c7.976,0,14.442-6.466,14.442-14.442c0-17.52,14.253-31.772,31.772-31.772c7.976,0,14.442-6.466,14.442-14.442v-92.796 C440.836,201.627,434.369,195.161,426.394,195.161z">
              </path>
              <g>
                <path style="fill:#41b454;"
                  d="M86.52,293.285v-74.568c23.894-5.498,42.738-24.352,48.238-48.246H279.38 c7.964,0,14.423-6.459,14.423-14.423s-6.459-14.423-14.423-14.423H121.975c-7.964,0-14.423,6.459-14.423,14.423 c0,19.55-15.904,35.454-35.454,35.454c-7.964,0-14.423,6.459-14.423,14.423v100.151c0,7.964,6.459,14.423,14.423,14.423 c19.55,0,35.454,15.904,35.454,35.454c0,7.964,6.459,14.423,14.423,14.423s14.423-6.459,14.423-14.423 C136.398,325.455,115.053,299.849,86.52,293.285z">
                </path>
                <path style="fill:#41b454;"
                  d="M439.903,191.501c-19.55,0-35.454-15.904-35.454-35.454c0-7.964-6.459-14.423-14.423-14.423 s-14.423,6.459-14.423,14.423c0,30.499,21.345,56.104,49.877,62.669v74.568c-23.894,5.498-42.738,24.352-48.238,48.246H227.945 c-7.964,0-14.423,6.459-14.423,14.423s6.459,14.423,14.423,14.423h162.081c7.964,0,14.423-6.459,14.423-14.423 c0-19.55,15.904-35.454,35.454-35.454c7.964,0,14.423-6.459,14.423-14.423V205.924 C454.326,197.959,447.867,191.501,439.903,191.501z">
                </path>
                <path style="fill:#41b454;"
                  d="M264.68,247.848V217.01c12.309,2.159,14.16,8.983,14.439,12.994c0.071,1.028,0.92,1.823,1.95,1.823 h13.444c1.129,0,2.018-0.955,1.96-2.083c-0.873-16.914-12.466-27.797-31.792-30.241v-10.37c0-1.082-0.877-1.957-1.957-1.957 h-13.444c-1.082,0-1.957,0.877-1.957,1.957v10.37c-20.11,2.543-31.846,14.221-31.846,32.323s11.736,29.78,31.846,32.323v30.838 c-12.309-2.159-14.16-8.983-14.439-12.994c-0.071-1.028-0.92-1.823-1.95-1.823h-13.444c-1.129,0-2.018,0.955-1.96,2.083 c0.873,16.914,12.466,27.796,31.792,30.241v10.37c0,1.082,0.877,1.957,1.957,1.957h13.444c1.082,0,1.957-0.877,1.957-1.957v-10.37 c20.11-2.543,31.846-14.221,31.846-32.323C296.524,262.069,284.788,250.392,264.68,247.848z M247.322,246.644 c-14.485-2.54-14.488-11.538-14.488-14.817c0-3.277,0.003-12.277,14.488-14.817V246.644z M264.68,294.99v-29.633 c14.485,2.54,14.488,11.54,14.488,14.817C279.166,283.45,279.163,292.45,264.68,294.99z">
                </path>
              </g>
            </g>
          </svg>
        </div>
      </router-link>
    </div>


    <!-- Botón para mostrar cuentas -->
    <!-- Eliminado: ya no se muestra aquí -->
  </div>
</template>

<style scoped></style>