import env from '@beam-australia/react-env'
import { GoogleAuthenticateRequest, LogoutRequest } from 'sdk'
import { AuthService } from 'lib/application/ports'
import { join } from 'lib/helper/url'
import { loginApi } from './api'

const useAuthService = (): AuthService => {
  const login = async (code: string) => {
    const req: GoogleAuthenticateRequest = { code }
    const res = await loginApi.googleAuthenticateRequest(req)
    return res.data.data.token
  }

  const logout = async (userId: number) => {
    const req: LogoutRequest = { user_id: userId }
    await loginApi.logoutRequest(req)
  }

  const askUserPermission = () => {
    location.href = join(env('API_BASE_URL'), '/api/auth/google-login')
  }

  return {
    login,
    logout,
    askUserPermission
  }
}

export default useAuthService
