import type { Category, TransactionType } from "@/interfaces"
import api from "./api"

const  getCategories = async (type?: TransactionType): Promise<Category[]> =>{
    const response = await api.get('/categories', { params : { type } } )
    return response.data 
}



export default {
    getCategories,
}
