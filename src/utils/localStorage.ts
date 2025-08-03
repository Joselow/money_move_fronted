const TOKEN_KEY = 'LOCAL_STORAGE_SAVE_TRANSAC_ITEM'

export const setItem = (key: string = TOKEN_KEY, value: any) => {
  localStorage.setItem(key, value)
}

export const getItem = (key: string = TOKEN_KEY) => {
  return localStorage.getItem(key)
}

export const removeItem = (key: string = TOKEN_KEY) => {
  localStorage.removeItem(key)
}
