import { toBase64 } from 'lib/helper/image'
import { ApiResponse } from 'lib/types/api/responseBase'
import cornerApi from './cornerApi'

export interface TokenInfo {
  token: string
}

export interface EditSettingsData {
  user_name: string
  file: FileList | null
  is_collection_public: boolean
}

const googleAuth = async (code: string) => {
  const res = await cornerApi.post<ApiResponse<TokenInfo>>(
    '/google-authenticate',
    { code }
  )
  return res.data.data.token
}

const logout = async (user_id: string) => {
  await cornerApi.post('/user/logout', { user_id })
}

const editInfo = async (userData: EditSettingsData, token: string) => {
  const file = userData.file && (await toBase64(userData.file[0]))
  const req = {
    file,
    name: userData.user_name,
    is_collection_public: userData.is_collection_public
  }
  await cornerApi.post('/user/edit-info', req, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const userApi = { googleAuth, logout, editInfo }

export default userApi
