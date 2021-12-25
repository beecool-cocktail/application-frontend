import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

interface usePermissionProps {
  guard?: boolean
}

const usePermission = ({ guard }: usePermissionProps = { guard: false }) => {
  const router = useRouter()
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) return setHasPermission(true)
    if (guard) router.push('/')
  }, [guard, router])

  return hasPermission
}

export default usePermission
