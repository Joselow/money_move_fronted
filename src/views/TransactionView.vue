  
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import FormTransaction from '@/components/Transaction/FormTransaction.vue'
import FullScreenLoader from '@/commons/FullScreenLoader.vue'

import { TRANSACTION_TYPE } from '@/constants/transaction'
import { useTransaction } from '@/composables/useTransaction'

const router = useRouter()
const route = useRoute()

const { id } = route.params

const type = route.meta.type == TRANSACTION_TYPE.INFLOW ?  TRANSACTION_TYPE.INFLOW :  TRANSACTION_TYPE.OUTFLOW

const { deleteTransaction, loading } = useTransaction()


const handleDeleteTransaction = async () => {
    if (!id) {
        return
    }
    const confirmed = confirm('¿Estas seguro de eliminar la transacción?')
    if (!confirmed) {
        return
    }
    
    const { success } = await deleteTransaction(Number(id))

    if (success) {
        router.push({ name: 'List' })
    }
}

</script>
  
<template>
    <FullScreenLoader v-if="loading" />

    <h1 class="text-xl font-bold tracking-wider mb-4 text-white">{{ id ? 'Ajustar' : 'Registrar' }} {{ type == TRANSACTION_TYPE.INFLOW ? 'Ingreso' : 'Gasto' }}</h1>

    <div class="">
        <div class="flex justify-end mb-2"
            v-if="id"
        >
            <button class="bg-red-500/60 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                @click="handleDeleteTransaction"
            > 
                <i class="pi pi-trash"></i> 
            </button>
        </div>

       <FormTransaction 
            :type="type"
        />
    </div>
</template>
