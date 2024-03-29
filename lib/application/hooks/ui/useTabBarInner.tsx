import { useEffect, useRef } from 'react'
import throttle from 'lodash.throttle'
import routes, { Route, pathname } from 'lib/application/configs/routes'
import useCornerRouter from 'lib/application/hooks/useCornerRouter'
import useCurrentUser from 'lib/application/hooks/user/useCurrentUser'
import useLoginDialog from 'lib/application/hooks/ui/useLoginDialog'
import Avatar from 'components/common/image/avatar'
import useTabBar from 'lib/application/hooks/ui/useTabBar'
import useAuth from '../auth/useAuth'

const useTabBarInner = () => {
  const { isVisible, setVisible } = useTabBar()
  const lastScrollTop = useRef(0)
  const loginDialog = useLoginDialog()
  const { token } = useAuth()
  const { user } = useCurrentUser()
  const router = useCornerRouter()
  const currentRouterRef = useRef<Route | undefined>()

  useEffect(() => {
    currentRouterRef.current = routes.find(r => r.path === router.pathname)
    if (currentRouterRef.current?.showTabBar) setVisible(true)
    else setVisible(false)
  }, [router.pathname, setVisible])

  let tabBarRoutes = routes
    .filter(r => r.tabBarIcon != null)
    .map(r => ({
      ...r,
      isActive: (() => {
        const profilePaths = [pathname.profile, pathname.collections]
        if (profilePaths.includes(r.path))
          return profilePaths.includes(router.pathname)

        return router.pathname === r.path
      })(),
      onClick: () => {
        if (r.requireAuth && !token) {
          loginDialog.open({
            redirectPath: r.path,
            collectAfterLogin: false
          })

          return
        }
        router.push(r.path)
      }
    }))

  if (user) {
    tabBarRoutes = tabBarRoutes.map(r => {
      if (r.path === pathname.profile)
        return {
          ...r,
          tabBarIcon: <Avatar src={user.croppedAvatar} size={24} />
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
  }, [setVisible])

  return { routes: tabBarRoutes, isVisible }
}

export default useTabBarInner
