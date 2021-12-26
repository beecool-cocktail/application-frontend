import { useRouter } from 'next/router'
import userApi from '../api/user'
import storage from '../helper/storage'

const useAuth = () => {
  const router = useRouter()

  const askUserPermission = () => {
    location.href = '/api/google-login'
  }

  const login = async (code: string) => {
    try {
      if (!code) return
      const token = await userApi.googleAuth(code)
      const userInfo = await userApi.getUserInfo(token)
      storage.setToken(token)
      storage.setUserInfo(userInfo)
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  const logout = async () => {
    try {
      const userInfo = storage.getUserInfo()
      if (!userInfo) return
      await userApi.logout(userInfo.user_id)
      storage.removeToken()
      storage.removeUserInfo()
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return { askUserPermission, logout, login }
}

export default useAuth
