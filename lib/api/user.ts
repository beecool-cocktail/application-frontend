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

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

const editInfo = async (userData: EditSettingsData, token: string) => {
  const file = userData.file && (await toBase64(userData.file[0]))
  const req = {
    file,
    name: userData.user_name,
    is_collection_public: userData.is_collection_public
  }
  await axios.post('/api/user/edit-info', req, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const userApi = { googleAuth, logout, editInfo }

export default userApi
