import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from 'components/common/status/loading'
import useAuth from 'lib/application/useAuth'

const GoogleAuthenticate = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) return
    const code = router.query.code as string
    if (!code) return
    login(router.query.code as string)
    setLoading(true)
  }, [loading, login, router])
  return <Loading />
}

export default GoogleAuthenticate
