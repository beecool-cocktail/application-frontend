import { useRouter } from 'next/router'
import snackbarMessages from 'lib/constants/snackbarMessages'
import dialogMessages from 'lib/constants/dialogMessages'
import useAuthService from '../services/authAdapter'
import { pathname, paths } from '../configs/routes'
import useSnackbar from './ui/useSnackbar'
import useConfirmDialog from './ui/useConfirmDialog'
import useWholePageSpinner from './ui/useWholePageSpinner'
import useToken from './useToken'

const useAuth = () => {
  const router = useRouter()
  const tokenService = useToken()
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const authService = useAuthService()
  const { setLoading } = useWholePageSpinner()

  const isAuthenticated = tokenService.token != null

  const login = async (code: string) => {
    try {
      if (!code) return
      setLoading(true)
      const token = await authService.login(code)
      if (!token) return snackbar.error(snackbarMessages.login.error)

      tokenService.setToken(token)
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
          tokenService.removeToken()
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

  const handleTokenExpired = () => {
    snackbar.error(snackbarMessages.tokenExpired)
    tokenService.removeToken()
    router.push(paths.index)
  }

  return {
    isAuthenticated,
    token: tokenService.token,
    logout,
    login,
    handleTokenExpired,
    askUserPermission: authService.askUserPermission
  }
}

export default useAuth
