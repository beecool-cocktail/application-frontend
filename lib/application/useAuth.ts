import { useRouter } from 'next/router'
import useLocalStorage from 'lib/services/localStorageAdapter'
import userApi from '../api/user'
import { paths } from '../configs/routes'
import useSnackbar from './useSnackbar'

const useAuth = () => {
  const router = useRouter()
  const storage = useLocalStorage()
  const snackbar = useSnackbar()

  const askUserPermission = () => {
    location.href = '/api/google-login'
  }

  const login = async (code: string) => {
    try {
      if (!code) return
      const token = await userApi.googleAuth(code)
      storage.setToken(token)
      snackbar.success('login success.')
      router.push(paths.index)
    } catch (e) {
      if (e instanceof Error) console.error(e.message)
    }
  }

  const logout = async (userId: number) => {
    try {
      await userApi.logout(userId)
      storage.removeToken()
      snackbar.success('logout success.')
      router.push(paths.index)
    } catch (e) {
      if (e instanceof Error) snackbar.error(e.message)
    }
  }

  return { askUserPermission, logout, login }
}

export default useAuth
