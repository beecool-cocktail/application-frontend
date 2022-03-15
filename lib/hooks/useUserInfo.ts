import { FALLBACK_URL } from 'lib/constants/image'
import useConfig from './useConfig'
import useCornerSWR from './useCornerSWR'
import type { UserInfo } from 'lib/types/user'

const useUserInfo = () => {
  const { config, loading: configLoading } = useConfig()
  const { data, error, mutate } = useCornerSWR<UserInfo>(
    config ? '/user/info' : null,
    { auth: true }
  )
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
