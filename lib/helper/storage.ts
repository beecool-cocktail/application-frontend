import { UserInfo } from '../api/user'

export const TOKEN_KEY = 'token'
export const USER_INFO_KEY = 'userInfo'

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const setUserInfo = (userInfo: UserInfo) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}

export const getUserInfo = () => {
  const userInfoString = localStorage.getItem(USER_INFO_KEY)
  if (!userInfoString) return null
  return JSON.parse(userInfoString) as UserInfo
}

export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY)
}

const storage = {
  setToken,
  getToken,
  removeToken,
  setUserInfo,
  getUserInfo,
  removeUserInfo
}

export default storage
