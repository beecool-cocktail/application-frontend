import axios from 'axios'
import { ApiResponse } from '../types/api/responseBase'

export interface TokenInfo {
  token: string
}

export interface EditSettingsData {
  user_name: string
  file: FileList | null
  is_collection_public: boolean
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

const editInfo = async (userData: EditSettingsData, token: string) => {
  const formData = new FormData()
  formData.append('name', userData.user_name)
  formData.append('is_collection_public', String(userData.is_collection_public))
  if (userData.file) formData.append('file', userData.file[0])
  await axios.post('/api/user/edit-info', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

const userApi = { googleAuth, logout, editInfo }

export default userApi
