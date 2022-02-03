import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoadingScreen from 'components/common/loadingScreen'
import useAuth from 'hooks/useAuth'

const GoogleAuthenticate = () => {
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    login(router.query.code as string)
  }, [login, router])
  return <LoadingScreen />
}

export default GoogleAuthenticate
