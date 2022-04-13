import { ApiResponse } from 'lib/types/api/responseBase'
import cornerApi from './cornerApi'

export interface TokenInfo {
  token: string
}

const googleAuth = async (code: string) => {
  const res = await cornerApi.post<ApiResponse<TokenInfo>>(
    '/google-authenticate',
    { code }
  )
  return res.data.data.token
}

const logout = async (user_id: number) => {
  await cornerApi.post('/user/logout', { user_id })
}

const userService = { googleAuth, logout }

export default userService
