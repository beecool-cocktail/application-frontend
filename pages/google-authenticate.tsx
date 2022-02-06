import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Spinner from 'components/common/status/spinner'
import useAuth from 'lib/hooks/useAuth'

const GoogleAuthenticate = () => {
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    login(router.query.code as string)
  }, [login, router])
  return <Spinner />
}

export default GoogleAuthenticate
