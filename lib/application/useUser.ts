import { FALLBACK_URL } from 'lib/constants/image'
import useUserService from 'lib/services/userAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useConfig from './useConfig'

const useUser = (id?: number) => {
  const storage = useLocalStorage()
  const { config, loading: configLoading, toAbsolutePath } = useConfig()
  const { getUserInfo, updateUserInfo } = useUserService(id, storage.getToken())
  const { data, error, mutate } = getUserInfo()

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
    mutate,
    updateUserInfo
  }
}

export default useUser
