import api from './api'
import type { Transaction, TransactionItem, TransactionType } from '../interfaces'

export const getTransactionRq = async (id: number) => {
    const response = await api.get<Transaction>(`/transactions/${id}`)
    return response.data
}

export const getTransactionsRq = async (params: {
    startDate: string, 
    endDate: string | null, 
    categoryId: number | null, 
    type: TransactionType | null 
}) => {
    const response = await api.get<TransactionItem[]>('/transactions', { params })
    return response.data
}

export const getTransactionByIdRq = async (id: number) => {
    const response = await api.get<TransactionItem>(`/transactions/${id}`)
    return response.data
}

export const getTotalTransactionsRq = async ({ date }: { date?: string | null }) => {
    const response = await api.get<{ total: number, type: TransactionType }>('/transactions/total', { params: { date } })
    return response.data
}

export const createTransactionRq = async (transaction: any) => {
    const response = await api.post<Transaction>('/transactions', transaction)
    return response.data
}
export const updateTransactionRq = async (transaction: any) => {
    const response = await api.patch<Transaction>(`/transactions/${transaction.id}`, transaction)
    return response.data
}

export const deleteTransactionRq = async (id: number) => {
    await api.delete(`/transactions/${id}`)
    return true
}