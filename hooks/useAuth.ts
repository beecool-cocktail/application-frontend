import { useRouter } from 'next/router'

const useAuth = () => {
  const router = useRouter()

  const login = () => {
    location.href = '/api/google-login'
  }

  const getToken = async (code: string) => {
    if (!code) return
    const response = await fetch('/api/google-authenticate', {
      method: 'POST',
      body: JSON.stringify({ code })
    })
    const responseBody = await response.json()
    const { token } = responseBody.data
    localStorage.setItem('token', token)
    router.push('/')
  }

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  return { login, logout, getToken }
}

export default useAuth
