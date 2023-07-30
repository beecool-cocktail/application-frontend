import { useEffect, useRef, useState } from 'react'
import throttle from 'lodash.throttle'
import routes, { Route, pathname } from 'lib/configs/routes'
import useCornerRouter from 'lib/application/useCornerRouter'
import useLoginDialog from 'lib/application/ui/useLoginDialog'
import Avatar from 'components/common/image/avatar'
import useCurrentUser from 'lib/application/user/useCurrentUser'

const useTabBar = () => {
  const [isVisible, setVisible] = useState(true)
  const lastScrollTop = useRef(0)
  const loginDialog = useLoginDialog()
  const { user } = useCurrentUser()
  const router = useCornerRouter({
    onError: () => loginDialog.setOpen(true)
  })
  const currentRouterRef = useRef<Route | undefined>()

  useEffect(() => {
    currentRouterRef.current = routes.find(r => r.path === router.pathname)
    if (currentRouterRef.current?.showTabBar) setVisible(true)
    else setVisible(false)
  }, [router.pathname])

  let tabBarRoutes = routes.filter(r => r.tabBarIcon != null)

  if (user) {
    tabBarRoutes = tabBarRoutes.map(r => {
      if (r.path === pathname.profile)
        return {
          ...r,
          tabBarIcon: <Avatar src={user.photo} size={24} />
        }
      return r
    })
  }

  useEffect(() => {
    const scrollHandler = throttle(() => {
      if (
        window.scrollY >= 0 &&
        lastScrollTop.current >= 0 && // Handle safari scrollY maybe negative number.
        currentRouterRef.current?.showTabBar
      ) {
        setVisible(lastScrollTop.current > window.scrollY)
      }
      lastScrollTop.current = window.scrollY
    }, 100)

    window.addEventListener('scroll', scrollHandler)
    return () => {
      scrollHandler.cancel()
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return { router, routes: tabBarRoutes, isVisible }
}

export default useTabBar
