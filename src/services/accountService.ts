import api from './api'
import type { Account } from '../interfaces'

export const getAccount = async (id: number) => {
    const response = await api.get<Account>(`/accounts/${id}`)
    return response.data
}

export const getAccounts = async () => {
    const response = await api.get<Account[]>('/accounts')
    return response.data
}

export const createAccount = async (account: any) => {
    const response = await api.post<Account>('/accounts', account)
    return response.data
}

export const deleteAccount = async (id: number) => {
    await api.delete(`/accounts/${id}`)
    return true
}