import type { UserConfig } from "@/interfaces"
import api from "./api"

// obtener configuracion del usuario
const  getConfig = async (): Promise<UserConfig> =>{
    const response = await api.get('/config')
    return response.data as UserConfig
}

// seleccionar cuenta
const selectAccount = async (accountId: number) => {
    const response = await api.put('/config/selected-account', { accountId })
    return response.data
}

export default {
    getConfig,
    selectAccount,
}
