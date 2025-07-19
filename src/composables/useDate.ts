import { ref, toRef } from "vue";

import {  useConfig } from "./useConfig";
import { currentDate } from "@/utils/date";

const  { config } = useConfig()

export function useDate () {    
    const dateInput = ref<HTMLInputElement | null>(null)

    const updateTargetDate = async (date: string) => {
        config.targetDate = date
    }

    const resetDate = async () => {
        config.targetDate = currentDate()
    }

    return {
        targetDate: toRef(config.targetDate),
        dateInput,
        updateTargetDate,
        resetDate
    }
}