import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Home, Search, Person } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Navbar from './navbar'
import Footer from './footer'
import ScrollToTopButton from './scrollToTopButton'
import styles from '../styles/Layout.module.css'
import { useState } from 'react'

const routes = [
  {
    path: '/',
    icon: <Home />,
    label: 'Home'
  },
  {
    path: '/search',
    icon: <Search />,
    label: 'Search'
  },
  {
    path: '/person',
    icon: <Person />,
    label: 'person'
  }
]

export default function Layout({ children }) {
  const router = useRouter()
  const [value, setValue] = useState(router.asPath)

  return (
    <div className={styles.container}>
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
    </div>
  )
}
