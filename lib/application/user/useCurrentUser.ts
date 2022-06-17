import useSWR from 'swr'
import { FALLBACK_URL } from 'lib/constants/image'
import userService from 'lib/services/userAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useConfig from '../useConfig'
import { UpdateUserForm } from '../ports'

const useCurrentUser = () => {
  const storage = useLocalStorage()
  const { config, loading: configLoading, toAbsolutePath } = useConfig()
  const { data, error, mutate } = useSWR(
    storage.getToken,
    userService.getCurrentUserInfo
  )

  const updateUserInfo = async (form: UpdateUserForm) => {
    const token = storage.getToken()
    if (!token) return

    await userService.updateCurrentUserInfo(form, token)
    await mutate()
  }

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

export default useCurrentUser
