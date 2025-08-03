import { TRANSACTION_TYPE } from '@/constants/transaction';
import { computed } from 'vue'
import { type Ref } from 'vue';

type UseStylesParams = 
    | { total: Ref<number>; type: Ref<string> }
    | { total: Ref<number>; type?: Ref<string> }
    | { total?: Ref<number>; type: Ref<string> }


export function useStyles ( { total, type }: UseStylesParams ) {
  const styles = computed(() => {
        let positive = false

        if (type && type.value && type.value == TRANSACTION_TYPE.INFLOW) {
            positive = true
        } else if (total && total.value && Number(total.value) > 0) {
            positive = true
        } else {
            positive = false
        }

        if (positive) {
            return {
                border: 'border-green-400',
                color: 'text-green-300'
            }
        } else {
            return {
            border: 'border-rose-400',
            color: 'text-rose-300'
        }
        }
    })

    return {
        styles
    }
}