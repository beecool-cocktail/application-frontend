import { UrlObject } from 'url'
import { useRouter } from 'next/router'
import routes from 'lib/configs/routes'
import useLocalStorage from 'lib/services/localStorageAdapter'

export interface useGotoProps {
  onError?: () => void
}

const useCornerRouter = (props?: useGotoProps) => {
  const nextRouter = useRouter()
  const storage = useLocalStorage()

  const push = (url: string | UrlObject) => {
    const route = routes.find(r => {
      if (typeof url === 'string') return r.path === url
      return r.path === url.pathname
    })
    if (!route) return
    if (route.requireAuth && !storage.getToken()) return props?.onError?.()
    nextRouter.push(url)
  }

  return { ...nextRouter, push }
}

export default useCornerRouter
