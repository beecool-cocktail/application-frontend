import { useRouter } from 'next/router'

const TOKEN_KEY = 'token'
const USER_INFO_KEY = 'userInfo'

const useAuth = () => {
  const router = useRouter()

  const login = () => {
    location.href = '/api/google-login'
  }

  const getUserInfo = async (code: string) => {
    if (!code) return
    const response = await fetch('/api/google-authenticate', {
      method: 'POST',
      body: JSON.stringify({ code })
    })
    const responseBody = await response.json()
    const { token } = responseBody.data
    localStorage.setItem(TOKEN_KEY, token)

    const userInfo = await fetch('/api/user/info', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
    router.push('/')
  }

  const logout = async () => {
    const userInfoString = localStorage.getItem(USER_INFO_KEY)
    if (!userInfoString) return

    const { user_id } = JSON.parse(userInfoString)
    const response = await fetch('/api/user/logout', {
      body: JSON.stringify({ user_id })
    })
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_INFO_KEY)
    router.push('/')
  }

  return { login, logout, getUserInfo }
}

export default useAuth
