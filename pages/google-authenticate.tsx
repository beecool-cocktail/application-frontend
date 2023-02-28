import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import useAuth from 'lib/application/useAuth'

const GoogleAuthenticate = () => {
  const router = useRouter()
  const { login } = useAuth()
  const isLoginLoading = useRef(false)

  useEffect(() => {
    if (!router.query.code || isLoginLoading.current) return
    isLoginLoading.current = true
    login(router.query.code as string)
  }, [login, router.query.code])

  return null
}

export default GoogleAuthenticate
