import { useEffect, useState } from 'react'
import { Token, TOKEN_KEY } from 'lib/services/localStorageAdapter'

const useToken = () => {
  const [token, rawSetToken] = useState<string | null>(null)
  const [isTokenReady, setIsTokenReady] = useState(false)

  const setToken = (token: Token) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(TOKEN_KEY, token)
    dispatchEvent(new Event('storage'))
  }

  const removeToken = () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(TOKEN_KEY)
    dispatchEvent(new Event('storage'))
  }

  useEffect(() => {
    const initialToken = localStorage.getItem(TOKEN_KEY)
    if (initialToken) {
      setToken(initialToken)
    }
    setIsTokenReady(true)
  }, [])

  useEffect(() => {
    window.addEventListener('storage', () => {
      rawSetToken(localStorage.getItem(TOKEN_KEY))
    })
  })

  return {
    isTokenReady,
    token,
    setToken,
    removeToken
  }
}

export default useToken
