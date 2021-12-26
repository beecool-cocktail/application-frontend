import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoadingScreen from '../components/loadingScreen'
import useAuth from '../hooks/useAuth'

const GoogleAuthenticate = () => {
  const router = useRouter()
  const { getUserInfo } = useAuth()

  useEffect(() => {
    getUserInfo(router.query.code as string)
  }, [getUserInfo, router])
  return <LoadingScreen />
}

export default GoogleAuthenticate
