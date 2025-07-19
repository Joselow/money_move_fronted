import api from './api'
import type { Transaction, TransactionType } from '../interfaces'

export const getTransactionRq = async (id: number) => {
    const response = await api.get<Transaction>(`/transactions/${id}`)
    return response.data
}

export const getTransactionsRq = async ({ date }: { date?: string }) => {
    const response = await api.get<Transaction[]>('/transactions', { params: { date } })
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

export const deleteTransactionRq = async (id: number) => {
    await api.delete(`/transactions/${id}`)
    return true
}