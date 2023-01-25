import { useEffect, useRef, useState } from 'react'
import throttle from 'lodash.throttle'
import routes, { pathname } from 'lib/configs/routes'
import useCornerRouter from 'lib/application/useCornerRouter'
import useLoginDialog from 'lib/application/ui/useLoginDialog'
import Avatar from 'components/common/image/avatar'
import useCurrentUser from 'lib/application/user/useCurrentUser'

const useTabBar = () => {
  const [isVisible, setVisible] = useState(true)
  const lastScrollTop = useRef(0)
  const loginDialog = useLoginDialog()
  const router = useCornerRouter({
    onError: () => loginDialog.setOpen(true)
  })
  let tabBarRoutes = routes.filter(r => r.inNavigationBar)
  const { user } = useCurrentUser()

  if (user) {
    tabBarRoutes = tabBarRoutes.map(r => {
      if (r.path === pathname.profile)
        return {
          ...r,
          icon: <Avatar src={user.photo} size={24} />
        }
      return r
    })
  }

  useEffect(() => {
    const scrollHandler = throttle(() => {
      // Handle safari scrollY maybe negative number.
      if (window.scrollY >= 0 && lastScrollTop.current >= 0)
        setVisible(lastScrollTop.current > window.scrollY)
      lastScrollTop.current = window.scrollY
    }, 100)

    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return { router, routes: tabBarRoutes, isVisible }
}

export default useTabBar
