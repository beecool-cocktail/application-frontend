import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Spinner from 'components/common/status/spinner'
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
  return <Spinner />
}

export default GoogleAuthenticate
