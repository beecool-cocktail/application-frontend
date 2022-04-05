import { LocalStorageService } from 'lib/application/ports'

export const TOKEN_KEY = 'token'

const useLocalStorage = (): LocalStorageService => ({
  getToken: () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(TOKEN_KEY)
  },
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY)
})

export default useLocalStorage
