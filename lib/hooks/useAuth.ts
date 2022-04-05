import { useRouter } from 'next/router'
import useLocalStorage from 'lib/services/localStorageAdapter'
import userApi from '../api/user'
import { paths } from '../configs/routes'

const useAuth = () => {
  const router = useRouter()
  const storage = useLocalStorage()

  const askUserPermission = () => {
    location.href = '/api/google-login'
  }

  const login = async (code: string) => {
    try {
      if (!code) return
      const token = await userApi.googleAuth(code)
      storage.setToken(token)
      router.push(paths.index)
    } catch (err) {
      console.error(err)
    }
  }

  const logout = async (userId: number) => {
    try {
      await userApi.logout(userId)
      storage.removeToken()
      router.push(paths.index)
    } catch (err) {
      console.error(err)
    }
  }

  return { askUserPermission, logout, login }
}

export default useAuth
