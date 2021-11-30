import { BottomNavigation, BottomNavigationAction, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import routes from '../configs/routes'

type LayoutProps = {
  header?: ReactNode
  children: ReactNode
}

const Layout = ({ header, children }: LayoutProps) => {
  const router = useRouter()
  const [value, setValue] = useState(router.asPath)

  useEffect(() => {
    setValue(router.asPath)
  }, [router.asPath])

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
      sx={{
        minHeight: '100vh',
        width: '100%',
        padding: 2
      }}
    >
      {header}
      {children}
      <BottomNavigation
        value={value}
        onChange={(_event, index) => setValue(index)}
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
            onClick={() => router.push(route.path)}
          />
        ))}
      </BottomNavigation>
    </Stack>
  )
}

export default Layout
