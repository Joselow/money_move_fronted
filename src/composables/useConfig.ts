import { reactive } from "vue";
import configService from "../services/configService.js";
import type { UserConfig } from "@/interfaces/index.js";

const config: UserConfig = reactive({
    account: null,
    hasMultipleAccounts: false,
}); 

export const useConfig = () => {
    const getConfig = async () => {
        const response = await configService.getConfig();
        config.account = response.account;
        config.hasMultipleAccounts = response.hasMultipleAccounts;
    }

    return { config, getConfig };
};
