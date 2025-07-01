import axios from 'axios'
import type { Account } from '../interfaces'

const API_URL = import.meta.env.VITE_API_URL

export const getAccount = async (id: number) => {
    const response = await axios.get(`${API_URL}/accounts/${id}`)
    return response.data as Account
}

export const createAccount = async (account: any) => {
    const response = await axios.post(`${API_URL}/accounts`, account)
    return response.data as Account
}

export const deleteAccount = async (id: number) => {
    await axios.delete(`${API_URL}/accounts/${id}`)
    return true
}