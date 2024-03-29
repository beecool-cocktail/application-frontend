import { GoogleAuthenticateRequest, LogoutRequest } from 'sdk'
import { AuthService } from 'lib/application/ports'
import { LoginResult, LoginState } from 'lib/domain/auth'
import { loginApi } from './api'

const askUserPermission = async (loginState: LoginState) => {
  const basePath = '/api/auth/google-login'
  const params = new URLSearchParams()
  params.append('redirect_path', loginState.redirectPath)
  params.append('collect_after_login', String(loginState.collectAfterLogin))
  location.href = basePath + '?' + params.toString()
}

const login = async (code: string, state: string): Promise<LoginResult> => {
  const req: GoogleAuthenticateRequest = { code, state }
  const res = await loginApi.googleAuthenticateRequest(req)
  const { token, redirect_path, collect_after_login } = res.data.data
  return {
    token,
    redirectPath: redirect_path,
    collectAfterLogin: collect_after_login === 'true'
  }
}

const logout = async (userId: number) => {
  const req: LogoutRequest = { user_id: userId }
  await loginApi.logoutRequest(req)
}

const authService: AuthService = {
  askUserPermission,
  login,
  logout
}

export default authService
