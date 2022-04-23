import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import useTabBar from 'lib/application/useTabBar'

export const TabBar = () => {
  const { router, routes } = useTabBar()

  return (
    <BottomNavigation
      value={router.asPath}
      onChange={(_event, value) => router.push(value)}
      sx={{
        width: '247px',
        height: '48px',
        px: '12px',
        position: 'fixed',
        zIndex: 1,
        bottom: '20px',
        left: 'calc(50% - 247px/2)',
        borderRadius: '8px',
        background: theme => theme.palette.dark5.main,
        boxShadow:
          '0px -2px 6px rgba(0, 0, 0, 0.25), 2px 2px 6px rgba(0, 0, 0, 0.25)',
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
            m: 0,
            p: 0,
            minWidth: '56px',
            height: 1,
            color: theme => theme.palette.light4.main,
            '& circle': {
              stroke: theme => theme.palette.light4.main,
              fill: 'transparent'
            },
            '& path': {
              stroke: theme => theme.palette.light4.main,
              fill: 'transparent'
            },
            '&.Mui-selected': {
              pt: 0,
              color: theme => theme.palette.light1.main,
              '& circle': {
                stroke: theme => theme.palette.light1.main,
                fill: theme => theme.palette.light4.main
              },
              '& path': {
                stroke: theme => theme.palette.light1.main,
                fill: theme => theme.palette.light4.main
              }
            },
            '&.Mui-selected::before': {
              content: '""',
              position: 'absolute',
              top: '40px',
              height: '4px',
              width: '4px',
              borderRadius: '50%',
              backgroundColor: theme => theme.palette.brandWhite.main
            },
            '& .MuiSvgIcon-root': {
              fontSize: '24px'
            }
          }}
        />
      ))}
    </BottomNavigation>
  )
}

export default TabBar
