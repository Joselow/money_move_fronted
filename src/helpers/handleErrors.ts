import { toast } from "vue-sonner"
import { removeAuthToken } from "./cookies"

const actions = {
    401: () => {
        removeAuthToken()
    },
    403: (msg = null) => {
        toast.error(msg ?? 'Acceso denegado')
    },
    404: (msg = null) => {
        toast.error(msg ?? 'No encontrado')
    },
    500: (msg = null) => {
        toast.error(msg ?? 'Error interno del servidor')
    },
    400: (msg = null) => {
        toast.error(msg ?? 'Ocurrio un error')
    },
}
export const handleErrors = async (error: any) => {
    if (!error) return

    // if (error.status === 404 && error.response?.data?.message) {
    //     toast.error(error.response?.data?.message)
    //   }
    const status = error.status as keyof typeof actions

    if (actions[status]) {
        actions[status](error.response?.data?.message)
    }
}