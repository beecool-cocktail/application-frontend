import { useRouter } from 'next/router'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useAuthService from '../services/authAdapter'
import { paths } from '../configs/routes'
import useSnackbar from './useSnackbar'

const useAuth = () => {
  const router = useRouter()
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const authService = useAuthService()

  const login = async (code: string) => {
    try {
      if (!code) return
      const token = await authService.login(code)
      if (!token) return snackbar.error('login failed.')

      storage.setToken(token)
      snackbar.success('login success.')
      router.push(paths.index)
    } catch (e) {
      if (e instanceof Error) console.error(e.message)
    }
  }

  const logout = async (userId: number) => {
    try {
      await authService.logout(userId)
      storage.removeToken()
      snackbar.success('logout success.')
      router.push(paths.index)
    } catch (e) {
      if (e instanceof Error) snackbar.error(e.message)
    }
  }

  return {
    logout,
    login,
    askUserPermission: authService.askUserPermission
  }
}

export default useAuth
