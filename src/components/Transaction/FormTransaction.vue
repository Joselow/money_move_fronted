  
<script setup lang="ts">
import { computed, ref } from 'vue'
  
const props = defineProps<{
    type: '0' | '1'
}>()

const bg = computed(() => props.type == '0' ? 'bg-rose-500' : 'bg-green-500')
const border = computed(() => props.type == '0' ? 'border-rose-500' : 'border-green-500')

const field1 = ref('')
const field2 = ref('')
const amount = ref<number | null>(null)
const notes = ref('')

const save = () => {
    console.log('Field 1:', field1.value)
    console.log('Field 2:', field2.value)
    console.log('Amount:', amount.value)
    console.log('Notes:', notes.value)
    alert('Saved!')
}
</script>
  
<template>
    <div :class="`bg-black border-2 rounded-xl p-6 w-100 flex flex-col gap-4 ${border} `">
        <!-- Dos campos en fila -->
        <div class="flex gap-2">
        <input
            v-model="field1"
            placeholder="Categoria"
            :class="`flex-1 px-2 py-1 border-2 rounded-md bg-transparent  focus:outline-none ${border}`"
        />
        </div>
    
        <!-- Campo numérico -->
        <input
        v-model.number="amount"
        type="number"
        placeholder="0.00"
        :class="`text-center text-4xl w-full px-2 py-2 border-2 rounded-md bg-transparent  focus:outline-none ${border}`"
        />
    
        <!-- Campo notas -->
        <textarea
        v-model="notes"
        placeholder="Descripción"
        rows="2"
        :class="`w-full px-2 py-2 border-2 rounded-md bg-transparent  focus:outline-none ${border}`"
        ></textarea>
    
        <!-- Botón guardar -->
        <button
        @click="save"
        class="w-full py-2 text-white font-bold rounded-md hover:opacity-90 transition"
        :class="bg"
        >
        SAVE
        </button>
    </div>
</template>
