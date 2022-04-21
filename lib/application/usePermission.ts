import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useLocalStorage from 'lib/services/localStorageAdapter'
import { paths } from '../configs/routes'

interface usePermissionProps {
  guard?: boolean
}

const usePermission = ({ guard }: usePermissionProps = { guard: false }) => {
  const router = useRouter()
  const storage = useLocalStorage()
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    if (storage.getToken()) return setHasPermission(true)
    if (guard) router.push(paths.index)
  }, [guard, router, storage])

  return hasPermission
}

export default usePermission
