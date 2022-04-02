import { toBase64 } from 'lib/helper/image'
import { ApiResponse } from 'lib/types/api/responseBase'
import { Configuration, UpdateUserInfoRequest, UserApi } from 'sdk'
import cornerApi from './cornerApi'

export interface TokenInfo {
  token: string
}

export interface EditSettingsData {
  user_name: string
  file?: FileList
  is_collection_public: boolean
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

const editInfo = async (userData: EditSettingsData, token: string) => {
  const file = userData.file && (await toBase64(userData.file[0]))
  const req: UpdateUserInfoRequest = {
    file,
    name: userData.user_name,
    is_collection_public: userData.is_collection_public
  }
  const config = new Configuration()
  config.apiKey = `Bearer ${token}`
  new UserApi(config).updateUserInfoRequest(req)
}

const userService = { googleAuth, logout, editInfo }

export default userService
