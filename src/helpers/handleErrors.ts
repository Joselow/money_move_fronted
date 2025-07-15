import { toast } from "vue-sonner"
import { removeAuthToken } from "./cookies"

const actions = {
    401: () => {
        removeAuthToken()
    },
    403: () => {
        toast.error('Acceso denegado')
    },
    404: () => {
        toast.error('No encontrado')
    },
    500: () => {
        toast.error('Error interno del servidor')
    },
}
export const handleErrors = async (error: keyof typeof actions) => {
    if (!error) return
    actions[error]()
}