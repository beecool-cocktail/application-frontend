import { useRouter } from 'next/router'
import userApi from '../api/user'
import storage from '../helper/storage'
import { paths } from '../configs/routes'

const useAuth = () => {
  const router = useRouter()

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

  const logout = async (userId: string) => {
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
