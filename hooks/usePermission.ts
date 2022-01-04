import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { paths } from '../configs/routes'
import storage from '../helper/storage'

interface usePermissionProps {
  guard?: boolean
}

const usePermission = ({ guard }: usePermissionProps = { guard: false }) => {
  const router = useRouter()
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    if (storage.getToken()) return setHasPermission(true)
    if (guard) router.push(paths.index)
  }, [guard, router])

  return hasPermission
}

export default usePermission
