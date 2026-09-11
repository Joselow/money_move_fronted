import api from './api'

import type { Transaction, TransactionItem } from '../interfaces'
import type { TransactionFilters } from '@/composables/useTransaction'

export const getTransactionRq = async (id: number) => {
    const response = await api.get<Transaction>(`/transactions/${id}`)
    return response.data
}

export const getTransactionsRq = async (params: TransactionFilters & { all?: boolean }) => {
    const response = await api.get<TransactionItem[]>('/transactions', { params })
    return response.data
}

export const getTransactionByIdRq = async (id: number) => {
    const response = await api.get<TransactionItem>(`/transactions/${id}`)
    return response.data
}

export const getTotalTransactionsRq = async ({ date }: { date?: string | null }) => {
    const response = await api.get<{ inflows: number; outflows: number }>('/transactions/total', { params: { date } })
    return response.data
}

export const getTransactionsExportRq = async (params: TransactionFilters) => {
    const response = await api.get<TransactionItem[]>('/transactions/export', { params })
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