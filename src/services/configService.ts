import type { UserConfig } from "@/interfaces"
import api from "./api"

// obtener configuracion del usuario
const  getConfig = async (): Promise<UserConfig> =>{
    const response = await api.get('/config')
    return response.data as UserConfig
}

export default {
    getConfig,
}
