import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Stack
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
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
      width={1}
      minHeight="100vh"
      padding={2}
    >
      {header}
      {children}
      <Box position="fixed" right={10} bottom={72}>
        <Fab color="primary">
          <AddIcon />
        </Fab>
      </Box>
      <Box position="fixed" bottom={0} left={0} width={1}>
        <BottomNavigation
          value={router.asPath}
          onChange={(_event, value) => {
            if (value === '/person') return
            router.push(value)
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
      </Box>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </Stack>
  )
}

export default Layout
