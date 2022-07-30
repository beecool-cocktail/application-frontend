import useSWR from 'swr'
import { FALLBACK_URL } from 'lib/constants/image'
import userService from 'lib/services/userAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useConfig from '../useConfig'

const FETCH_KEY = 'USER'

const useUser = (id?: number) => {
  const storage = useLocalStorage()
  const { config, loading: configLoading, toAbsolutePath } = useConfig()
  const { data, error, mutate } = useSWR(
    () => {
      if (id) return [id, FETCH_KEY]
      const token = storage.getToken()
      if (!token) return null
      return [storage.getToken(), FETCH_KEY]
    },
    id ? userService.getOtherUserInfo : userService.getCurrentUserInfo
  )

  let user = data
  if (data && config) {
    if (!data.photo) user = { ...data, photo: FALLBACK_URL }
    else user = { ...data, photo: toAbsolutePath(data.photo) }
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
