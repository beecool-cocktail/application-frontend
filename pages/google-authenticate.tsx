import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import useAuth from 'lib/application/useAuth'
import useErrorHandler from 'lib/application/useErrorHandler'

const GoogleAuthenticate = () => {
  const errorHandler = useErrorHandler()
  const router = useRouter()
  const { login } = useAuth()
  const isLoginLoading = useRef(false)

  useEffect(() => {
    if (!router.query.code || isLoginLoading.current) return
    isLoginLoading.current = true
    const code = router.query.code as string
    const state = router.query.state as string

    if (!code || !state) {
      return errorHandler.handleError(
        new Error('google redirect url missing code or state')
      )
    }

    login(code, state)
  }, [errorHandler, login, router.query.code, router.query.state])

  return null
}

export default GoogleAuthenticate
