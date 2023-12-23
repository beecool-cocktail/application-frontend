import { useEffect, useState } from 'react'
import { Token, TOKEN_KEY } from 'lib/services/localStorageAdapter'

const useToken = () => {
  const [token, rawSetToken] = useState(
    typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null
  )

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
    window.addEventListener('storage', () => {
      rawSetToken(localStorage.getItem(TOKEN_KEY))
    })
  })

  return {
    token,
    setToken,
    removeToken
  }
}

export default useToken
