import axios from 'axios'
import { ApiResponse } from '../types/api/responseBase'

export interface TokenInfo {
  token: string
}

const googleAuth = async (code: string) => {
  const res = await axios.post<ApiResponse<TokenInfo>>(
    '/api/google-authenticate',
    { code }
  )
  return res.data.data.token
}

const logout = async (user_id: string) => {
  await axios.post('/api/user/logout', { user_id })
}

const userApi = { googleAuth, logout }

export default userApi
