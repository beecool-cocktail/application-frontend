import useSWR from 'swr'
import { FALLBACK_URL } from 'lib/application/constants/image'
import userService from 'lib/services/userAdapter'
import useConfig from '../useConfig'
import useAuth from '../auth/useAuth'

const FETCH_KEY = 'USER'

const useUser = (id?: number) => {
  const { token } = useAuth()
  const { config, loading: configLoading, toAbsolutePath } = useConfig()
  const { data, error, mutate } = useSWR(
    () => {
      if (id) return [id, FETCH_KEY]
      if (!token) return null
      return [token, FETCH_KEY]
    },
    id ? userService.getOtherUserInfo : userService.getCurrentUserInfo
  )

  let user = data
  if (data && config) {
    if (!data.croppedAvatar) user = { ...data, croppedAvatar: FALLBACK_URL }
    else user = { ...data, croppedAvatar: toAbsolutePath(data.croppedAvatar) }
  } else {
    user = undefined
  }

  return {
    user,
    loading: (!data && !error) || configLoading,
    error,
    mutate
  }
}

export default useUser
