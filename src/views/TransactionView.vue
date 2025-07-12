  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import FormTransaction from '@/components/Transaction/FormTransaction.vue'

const route = useRoute()

const type = route.name == 'Inflow' ? '1' : '0'


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
    <div class="flex justify-center">
       <FormTransaction :type="type"/>
    </div>
</template>
