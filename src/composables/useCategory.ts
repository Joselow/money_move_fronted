import { ref } from "vue"
import CategoryService  from "@/services/categoryService"
import type { Category, TransactionType } from "@/interfaces"

export function useCategory() {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const categories = ref<Category[]>([])
    const loadingCategories = ref(false)
  
    const getCategories = async (type: TransactionType) => {
      loading.value = true
      error.value = null
      try {
        const result = await CategoryService.getCategories(type)
        categories.value = result
        console.log(categories.value);
        
        return result
      } catch (err: any) {
        error.value = err?.message || 'Error al crear la cuenta'
        throw err
      } finally {
        loading.value = false
      }
    }
  
    return {
      loading,
      error,
      categories,
      loadingCategories,
      getCategories
    }
  } 