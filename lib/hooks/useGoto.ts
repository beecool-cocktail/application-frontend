import { UrlObject } from 'url'
import { useRouter } from 'next/router'
import { paths, getUrlById } from 'lib/configs/routes'
import routes from 'lib/configs/routes'
import storage from 'lib/helper/storage'

export interface useGotoProps {
  onBlock?: () => void
}

const useGoto = (props?: useGotoProps) => {
  const router = useRouter()

  const goto = (url: string | UrlObject) => {
    const route = routes.find(r => {
      if (typeof url === 'string') return r.path === url
      return r.path === url.pathname
    })
    if (!route) return
    if (route.requireAuth && !storage.getToken()) {
      return props?.onBlock?.()
    }
    router.push(url)
  }

  return {
    router,
    goto,
    gotoIndex: () => goto(paths.index),
    gotoSearch: () => goto(paths.search),
    gotoProfile: () => goto(paths.profile),
    gotoDrafts: () => goto(paths.drafts),
    gotoSettings: () => goto(paths.settings),
    gotoCocktailDetails: (id: number) =>
      goto(getUrlById(paths.cocktailById, id)),
    gotoCreatePost: () => goto(paths.creatPost)
  }
}

export default useGoto
