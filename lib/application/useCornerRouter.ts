import { UrlObject } from 'url'
import { useRouter } from 'next/router'
import { useShallow } from 'zustand/react/shallow'
import routes, { pathname } from 'lib/configs/routes'
import useStore from 'lib/services/storeAdapter'

const useCornerRouter = () => {
  const router = useRouter()
  const { history, setHistory } = useStore(
    useShallow(state => {
      return {
        history: state.history,
        setHistory: state.setHistory
      }
    })
  )

  const push = (url: string | UrlObject) => {
    const route = routes.find(r => {
      if (typeof url === 'string') return r.path === url
      return r.path === url.pathname
    })
    if (!route) return

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
