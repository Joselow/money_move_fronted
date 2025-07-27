  
<script setup lang="ts">
import { useRoute } from 'vue-router'

import FormTransaction from '@/components/Transaction/FormTransaction.vue'

import { TRANSACTION_TYPE } from '@/constants/transaction'
import { useCategory } from '@/composables/useCategory'

const route = useRoute()

const type = route.meta.type == TRANSACTION_TYPE.INFLOW ?  TRANSACTION_TYPE.INFLOW :  TRANSACTION_TYPE.OUTFLOW

const { categories, getCategories } = useCategory()

getCategories(type)

</script>
  
<template>
    <h1 class="text-xl font-bold tracking-wider mb-3 text-white">Registrar {{ type == TRANSACTION_TYPE.INFLOW ? 'Ingreso' : 'Gasto' }}</h1>

    <div class="">
       <FormTransaction 
        :type="type"
        :categories="categories"
        />
    </div>
</template>
