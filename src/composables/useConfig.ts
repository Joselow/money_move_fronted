import { reactive, ref } from "vue";

import configService from "../services/configService.js";

import type { UserConfig } from "@/interfaces/index.js";
import type { Account } from "@/interfaces/index.js";

import { currentDate } from "@/utils/date.js";

const config: UserConfig = reactive({
    account: null,
    hasMultipleAccounts: false,
    targetDate: currentDate()
}); 

export const useConfig = () => {
    const loading = ref(false)
    const getConfig = async () => {
        const response = await configService.getConfig();
        config.account = response.account;
        config.hasMultipleAccounts = response.hasMultipleAccounts;
    }

    const selectAccount = async (account: Account) => {
        try {
            loading.value = true
            await configService.selectAccount(account.id);
            config.account = account;

            return {
                success: true
            }
        } catch (err: any) {
            console.log(err)
            return {
                success: false
            }
        } finally { loading.value = false }
    }

    return { config, getConfig, selectAccount, loading };
};
