import { UrlObject } from 'url'
import { useRouter } from 'next/router'
import routes, { pathname } from 'lib/configs/routes'
import useLocalStorage from 'lib/services/localStorageAdapter'

export interface useGotoProps {
  onError?: () => void
}

const useCornerRouter = (props?: useGotoProps) => {
  const router = useRouter()
  const storage = useLocalStorage()

  const push = (url: string | UrlObject) => {
    const route = routes.find(r => {
      if (typeof url === 'string') return r.path === url
      return r.path === url.pathname
    })
    if (!route) return
    if (route.requireAuth && !storage.getToken()) return props?.onError?.()
    router.push(url)
  }

  const canGoBack = () => {
    if (typeof window === 'undefined') return false
    return !window.history.state.options._shouldResolveHref
  }

  const back = (fallbackPath = pathname.index) => {
    if (canGoBack()) {
      return router.back()
    }
    router.push(fallbackPath)
  }

  return { ...router, back, push }
}

export default useCornerRouter
