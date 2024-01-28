import { useEffect } from 'react'
import { paths } from 'lib/configs/routes'
import useCornerRouter from './useCornerRouter'
import useAuth from './useAuth'

const useAuthGuard = () => {
  const auth = useAuth()
  const router = useCornerRouter()

  useEffect(() => {
    if (!auth.isAuthenticated && auth.isTokenReady) {
      router.replace(paths.index)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated, auth.isTokenReady])

  return auth.isAuthenticated
}

export default useAuthGuard
