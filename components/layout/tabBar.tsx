import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import routes, { paths } from 'lib/configs/routes'
import useCornerRouter from 'lib/application/useCornerRouter'
import useLoginDialog from 'lib/application/useLoginDialog'
import Avatar from 'components/common/image/avatar'
import useUser from 'lib/application/useUser'

const mx = 64

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

export const TabBar = () => {
  const { router, routes } = useTabBar()

  return (
    <BottomNavigation
      value={router.asPath}
      onChange={(_event, value) => router.push(value)}
      sx={{
        background:
          'linear-gradient(0deg, rgba(32, 103, 245, 0.05), rgba(32, 103, 245, 0.05)), rgba(32, 32, 32, 0.9)',
        backdropFilter: 'blur(8px)',
        boxShadow:
          '2px 2px 4px rgba(0, 0, 0, 0.5), inset 0px 4px 4px rgba(255, 255, 255, 0.25)',
        position: 'fixed',
        zIndex: 1,
        px: '24px',
        bottom: 20,
        left: 0,
        mx: `${mx}px`,
        width: `calc(100% - ${mx * 2}px)`,
        height: '48px',
        borderRadius: '100px',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {routes.map(route => (
        <BottomNavigationAction
          key={route.path}
          value={route.path}
          icon={route.icon}
          disableRipple
          onClick={() => router.push(route.path)}
          sx={{
            margin: 0,
            padding: 0,
            minWidth: '32px',
            width: '32px',
            height: '32px',
            color: theme => theme.palette.light4.main,
            '&.Mui-selected': {
              color: theme => theme.palette.white.main,
              paddingTop: 0
            },
            '&.Mui-selected::before': {
              content: '""',
              position: 'absolute',
              backgroundColor: theme => theme.palette.white.main,
              height: '24px',
              width: '24px',
              filter: 'blur(12px)'
            },
            '& .MuiSvgIcon-root': {
              fontSize: '32px'
            }
          }}
        />
      ))}
    </BottomNavigation>
  )
}

export default TabBar
