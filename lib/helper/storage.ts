export const TOKEN_KEY = 'token'

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

const storage = {
  setToken,
  getToken,
  removeToken
}

export default storage
