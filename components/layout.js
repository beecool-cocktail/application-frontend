import { BottomNavigation, BottomNavigationAction, Stack } from '@mui/material'
import { Home, Search, Person } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useState } from 'react'

const routes = [
  {
    path: '/',
    label: 'Home',
    icon: <Home />
  },
  {
    path: '/search',
    label: 'Search',
    icon: <Search />
  },
  {
    path: '/person',
    label: 'person',
    icon: <Person />
  }
]

export default function Layout({ children }) {
  const router = useRouter()
  const [value, setValue] = useState(router.asPath)

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
