import { useRouter } from 'next/router'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useAuthService from '../services/authAdapter'
import { pathname } from '../configs/routes'
import useSnackbar from './ui/useSnackbar'
import useConfirmDialog from './ui/useConfirmDialog'

const useAuth = () => {
  const router = useRouter()
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const authService = useAuthService()

  const login = async (code: string) => {
    try {
      if (!code) return
      const token = await authService.login(code)
      if (!token) return snackbar.error('login failed.')

      storage.setToken(token)
      snackbar.success('login success.')
      router.push(pathname.index)
    } catch (e) {
      if (e instanceof Error) console.error(e.message)
    }
  }

  const logout = async (userId: number) => {
    confirmDialog.open({
      title: '登出帳號',
      content: '是否確定登出',
      onConfirm: async () => {
        try {
          await authService.logout(userId)
          storage.removeToken()
          snackbar.success('logout success.')
          router.push(pathname.index)
        } catch (e) {
          if (e instanceof Error) snackbar.error(e.message)
        } finally {
          confirmDialog.destroy()
        }
      },
      onCancel: () => confirmDialog.destroy()
    })
  }

  return {
    logout,
    login,
    askUserPermission: authService.askUserPermission
  }
}

export default useAuth
