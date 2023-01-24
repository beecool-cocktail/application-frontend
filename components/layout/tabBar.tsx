import { Box, Stack } from '@mui/material'
import useTabBar from 'lib/application/useTabBar'
import TabBarIcon from './tabBarIcon'

export const TabBar = () => {
  const { router, routes } = useTabBar()

  return (
    <Stack
      direction="row"
      sx={{
        width: '247px',
        height: '48px',
        px: '12px',
        position: 'fixed',
        zIndex: 1,
        bottom: '24px',
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
        <Box
          key={route.path}
          onClick={() => {
            router.push(route.path)
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            m: 0,
            p: 0,
            minWidth: '56px',
            height: 1,
            fontSize: 24,
            color: theme => theme.palette.light4.main,
            '& *': {
              stroke: theme => theme.palette.light4.main,
              fill: 'transparent'
            },
            '&.Mui-selected': {
              pt: 0,
              color: theme => theme.palette.light1.main,
              '& *': {
                stroke: theme => theme.palette.light1.main,
                fill: theme => theme.palette.light4.main
              }
            },
            '&::before':
              router.asPath === route.path
                ? {
                    content: '""',
                    position: 'absolute',
                    top: '40px',
                    height: '4px',
                    width: '4px',
                    borderRadius: '50%',
                    backgroundColor: theme => theme.palette.brandWhite.main
                  }
                : undefined,
            cursor: 'pointer'
          }}
        >
          {typeof route.icon === 'string' ? (
            <TabBarIcon
              artboard={route.icon}
              pressed={router.asPath === route.path}
            />
          ) : (
            route.icon
          )}
        </Box>
      ))}
    </Stack>
  )
}

export default TabBar
