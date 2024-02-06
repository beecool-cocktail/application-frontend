import { Box, Stack } from '@mui/material'
import useTabBarInner from 'lib/application/hooks/ui/useTabBarInner'
import AnimationToggleIcon from '../common/animationToggleIcon'

export const TabBar = () => {
  const { routes, isVisible } = useTabBarInner()

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
        justifyContent: 'space-between',
        transition: 'transform 0.3s cubic-bezier(0.7, -0.4, 0.4, 1.4)',
        transform: isVisible ? '' : 'translateY(80px)'
      }}
    >
      {routes.map(route => (
        <Box
          key={route.path}
          onClick={route.onClick}
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
            '&::before': route.isActive
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
          {typeof route.tabBarIcon === 'string' ? (
            <AnimationToggleIcon
              artboard={route.tabBarIcon}
              active={route.isActive}
            />
          ) : (
            route.tabBarIcon
          )}
        </Box>
      ))}
    </Stack>
  )
}

export default TabBar
