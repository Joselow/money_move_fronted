import { ref } from "vue";

import {  useConfig } from "./useConfig";
import { currentDate } from "@/utils/date";

const  { config } = useConfig()

const targetDate = ref(currentDate())

export function useDate () {    
    const dateInput = ref<HTMLInputElement | null>(null)

    const updateTargetDate = async (date: string) => {
        console.log('ACTUALIZA', date)    ;
        targetDate.value = date
    }

    const resetDate = async () => {
        targetDate.value = currentDate()
    }

    return {
        targetDate,
        dateInput,
        updateTargetDate,
        resetDate
    }
}