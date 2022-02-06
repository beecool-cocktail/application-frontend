import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import storage from 'lib/helper/storage'
import useConfig from './useConfig'
import type { UserInfo } from 'lib/types/user'
import type { ApiResponse } from 'lib/types/api/responseBase'

const FALLBACK_URL = '/cocktail.jpg'

const fetcher: Fetcher<UserInfo, [string, string]> = async (url, token) => {
  const res = await axios.get<ApiResponse<UserInfo>>(url, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (res.status !== 200) throw new Error(res.statusText)
  if (res.data.error_code !== '00000') throw new Error(res.data.error_message)
  return res.data.data
}

const useUserInfo = () => {
  const token = storage.getToken()
  const { config, loading: configLoading } = useConfig()
  const { data, error, mutate } = useSWR(
    token && config ? ['/api/user/info', token] : null,
    fetcher
  )
  if (error) storage.removeToken()
  let userInfo = data
  if (data && config) {
    if (!data.photo) userInfo = { ...data, photo: FALLBACK_URL }
    else userInfo = { ...data, photo: `${config.staticBaseUrl}/${data.photo}` }
  }

  return {
    userInfo,
    loading: (!data && !error) || configLoading,
    error,
    mutate
  }
}

export default useUserInfo
