import routes, { paths } from 'lib/configs/routes'
import useCornerRouter from 'lib/application/useCornerRouter'
import useLoginDialog from 'lib/application/useLoginDialog'
import Avatar from 'components/common/image/avatar'
import useUser from 'lib/application/useUser'

const useTabBar = () => {
  const loginDialog = useLoginDialog()
  const router = useCornerRouter({
    onError: () => loginDialog.setOpen(true)
  })
  let tabBarRoutes = routes.filter(r => r.inNavigationBar)
  const { user } = useUser()

  if (user) {
    tabBarRoutes = tabBarRoutes.map(r => {
      if (r.path === paths.profile)
        return { ...r, icon: <Avatar src={user.photo} size={24} /> }
      return r
    })
  }

  return { router, routes: tabBarRoutes }
}

export default useTabBar
