import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoadingScreen from '../components/loadingScreen'
import useAuth from '../hooks/useAuth'

const GoogleAuthenticate = () => {
  const router = useRouter()
  const { getToken } = useAuth()

  useEffect(() => {
    getToken(router.query.code as string)
  }, [getToken, router])
  return <LoadingScreen />
}

export default GoogleAuthenticate
