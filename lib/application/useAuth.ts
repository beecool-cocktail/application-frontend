import { useRouter } from 'next/router'
import useLocalStorage from 'lib/services/localStorageAdapter'
import snackbarMessages from 'lib/constants/snackbarMessages'
import dialogMessages from 'lib/constants/dialogMessages'
import useAuthService from '../services/authAdapter'
import { pathname } from '../configs/routes'
import useSnackbar from './ui/useSnackbar'
import useConfirmDialog from './ui/useConfirmDialog'
import useWholePageSpinner from './ui/useWholePageSpinner'

const useAuth = () => {
  const router = useRouter()
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const authService = useAuthService()
  const { setLoading } = useWholePageSpinner()

  const login = async (code: string) => {
    try {
      if (!code) return
      setLoading(true)
      const token = await authService.login(code)
      if (!token) return snackbar.error(snackbarMessages.login.error)

      storage.setToken(token)
      router.push(pathname.index)
    } catch (err) {
      snackbar.error(snackbarMessages.login.error)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const logout = async (userId: number) => {
    confirmDialog.open({
      ...dialogMessages.logout,
      onConfirm: async () => {
        try {
          await authService.logout(userId)
          storage.removeToken()
          router.push(pathname.index)
        } catch (err) {
          snackbar.error(snackbarMessages.logout.error)
          console.error(err)
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
