import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import snackbarMessages from 'lib/constants/snackbarMessages'
import dialogMessages from 'lib/constants/dialogMessages'
import useStore from 'lib/services/storeAdapter'
import { LoginState } from 'lib/domain/auth'
import useAuthService from '../services/authAdapter'
import { pathname, paths } from '../configs/routes'
import useTokenStore from '../services/useTokenStore'
import useSnackbar from './ui/useSnackbar'
import useConfirmDialog from './ui/useConfirmDialog'
import useWholePageSpinner from './ui/useWholePageSpinner'

const useAuth = () => {
  const [isTokenReady, setTokenReady] = useState(false)
  const router = useRouter()
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const authService = useAuthService()
  const { setLoading } = useWholePageSpinner()
  const store = useStore(
    useShallow(state => ({
      setCollectAfterLogin: state.setCollectAfterLogin
    }))
  )

  const tokenStore = useTokenStore()
  useEffect(() => {
    setTokenReady(true)
  }, [tokenStore.token])

  const isAuthenticated = tokenStore.token != null

  const askUserPermission = async (loginState?: LoginState) => {
    return authService.askUserPermission({
      collectAfterLogin: loginState?.collectAfterLogin || false,
      redirectPath: loginState?.redirectPath || router.asPath
    })
  }

  const login = async (code: string, state: string) => {
    try {
      if (!code || !state) return
      setLoading(true)
      const { token, redirectPath, collectAfterLogin } =
        await authService.login(code, state)
      if (!token) return snackbar.error(snackbarMessages.login.error)

      tokenStore.setToken(token)
      router.push(redirectPath || pathname.index)
      if (collectAfterLogin) store.setCollectAfterLogin(collectAfterLogin)
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
          tokenStore.removeToken()
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
    tokenStore.removeToken()
    router.push(paths.index)
  }

  return {
    isAuthenticated,
    isTokenReady,
    token: tokenStore.token,
    logout,
    login,
    handleTokenExpired,
    askUserPermission
  }
}

export default useAuth
