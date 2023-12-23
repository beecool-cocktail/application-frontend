import { useLayoutEffect } from 'react'
import { paths } from 'lib/configs/routes'
import useAuth from './useAuth'
import useCornerRouter from './useCornerRouter'

const useAuthGuard = () => {
  const auth = useAuth()
  const router = useCornerRouter()

  useLayoutEffect(() => {
    if (!auth.isAuthenticated) {
      router.replace(paths.index)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated])

  return auth.isAuthenticated
}

export default useAuthGuard
