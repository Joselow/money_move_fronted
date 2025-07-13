  
<script setup lang="ts">
import ScrollX from '@/commons/ScrollX.vue';
import { TRANSACTION_TYPE } from '@/constants/transaction';
import type { Category, TransactionType } from '@/interfaces';
import { computed, ref } from 'vue'
  
const props = defineProps<{
    type: TransactionType,
    categories: Category[],
}>()

const bg = computed(() => props.type == TRANSACTION_TYPE.OUTFLOW ? 'bg-rose-400' : 'bg-green-500')
const border = computed(() => props.type == TRANSACTION_TYPE.OUTFLOW ? 'border-rose-400' : 'border-green-500')

const categoryId = ref<number | null>(null)
const amount = ref<number | null>(null)
const notes = ref('')

const save = () => {
    console.log('Field 1:', categoryId.value)
    console.log('Amount:', amount.value)
    console.log('Notes:', notes.value)
    alert('Saved!')
}

const selectCategory = async (id: number) => {
    console.log(id);
    
    categoryId.value = id
}

</script>
  
<template>
    <div :class="` bg-black border-2 rounded-xl p-6  flex flex-col gap-4 ${border}`">
        <!-- Dos campos en fila -->
        <div class="flex gap-2">
            <ScrollX>
                <template v-for="category in categories" :key="category.id">
                    <!-- <div
                        class="w-100 px-2 py-0 border-2 rounded-md"
                    >
                        {{ category.name }}
                    </div> -->
                    <div class="py-1 px-2 border-2 rounded-md  text-white"
                        @click="selectCategory(category.id)"
                        :class="{
                            'bg-blue-900': categoryId === category.id,
                            'bg-neutral-800': categoryId !== category.id
                        }"
                    >
                        {{ category.name }}
                    </div>
                </template>
            </ScrollX>
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
