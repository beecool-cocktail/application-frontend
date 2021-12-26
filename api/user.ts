import axios from 'axios'
import { ApiResponse } from './responseBase'

export interface UserInfo {
  user_id: string
}

export interface TokenInfo {
  token: string
}

const googleAuth = async (code: string) => {
  const res = await axios.post<ApiResponse<TokenInfo>>(
    '/api/google-authenticate',
    { body: JSON.stringify({ code }) }
  )
  return res.data.data.token
}

const getUserInfo = async (token: string): Promise<UserInfo> => {
  const res = await axios.get<ApiResponse<UserInfo>>('/api/user/info', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.data
}

const logout = async (user_id: string) => {
  await axios.post('/api/user/logout', {
    body: JSON.stringify({ user_id })
  })
}

const userApi = { googleAuth, getUserInfo, logout }

export default userApi
