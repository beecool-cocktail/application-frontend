import { GoogleAuthenticateRequest, LogoutRequest } from 'sdk'
import { AuthService } from 'lib/application/ports'
import { userApi, loginApi } from './api'

const useAuthService = (): AuthService => {
  const login = async (code: string) => {
    const req: GoogleAuthenticateRequest = { code }
    const res = await loginApi.googleAuthenticateRequest(req)
    return res.data.data?.token
  }

  const logout = async (userId: number) => {
    const req: LogoutRequest = { user_id: userId }
    await userApi.logoutRequest(req)
  }

  const askUserPermission = () => {
    location.href = '/api/auth/google-login'
  }

  return {
    login,
    logout,
    askUserPermission
  }
}

export default useAuthService
