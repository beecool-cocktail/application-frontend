import { UrlObject } from 'url'
import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'
import routes, { pathname } from 'lib/configs/routes'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useStore from 'lib/services/storeAdapter'

export interface useGotoProps {
  onError?: () => void
}

const useCornerRouter = (props?: useGotoProps) => {
  const router = useRouter()
  const storage = useLocalStorage()
  const { history, setHistory } = useStore(state => {
    return {
      history: state.history,
      setHistory: state.setHistory
    }
  }, shallow)

  const push = (url: string | UrlObject) => {
    const route = routes.find(r => {
      if (typeof url === 'string') return r.path === url
      return r.path === url.pathname
    })
    if (!route) return
    if (route.requireAuth && !storage.getToken()) return props?.onError?.()

    if (typeof url === 'string') setHistory([...history, url])
    else if (url.pathname) {
      setHistory([...history, url.pathname])
    }
    router.push(url)
  }

  const canGoBack = history.length > 1

  const back = (fallbackPath = pathname.index) => {
    if (canGoBack) {
      return router.back()
    }
    router.replace(fallbackPath)
  }

  return { ...router, back, push }
}

export default useCornerRouter
