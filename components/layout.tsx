import { BottomNavigation, BottomNavigationAction, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'
import routes from '../configs/routes'
import LoginDialog from './loginDialog'

type LayoutProps = {
  header?: ReactNode
  children: ReactNode
}

const Layout = ({ header, children }: LayoutProps) => {
  const router = useRouter()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
      sx={{ minHeight: '100vh', width: '100%', padding: 2 }}
    >
      {header}
      {children}
      <BottomNavigation
        value={router.asPath}
        onChange={(_event, value) => {
          if (value === '/person') return
          router.push(value)
        }}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%'
        }}
      >
        {routes.map(route => (
          <BottomNavigationAction
            key={route.path}
            label={route.label}
            value={route.path}
            icon={route.icon}
            onClick={() => {
              if (route.path !== '/person' || localStorage.getItem('token')) {
                return router.push(route.path)
              }
              setLoginDialogOpen(true)
            }}
          />
        ))}
      </BottomNavigation>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </Stack>
  )
}

export default Layout
