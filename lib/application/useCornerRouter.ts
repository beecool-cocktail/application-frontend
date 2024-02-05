import { UrlObject } from 'url'
import { useRouter } from 'next/router'
import routes, { pathname } from 'lib/configs/routes'
import useHistory from 'lib/application/ui/useHistory'
import useScrollRestoration from './useScrollRestoration'

const useCornerRouter = () => {
  const router = useRouter()
  useScrollRestoration(router)
  const { history, setHistory } = useHistory()

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
