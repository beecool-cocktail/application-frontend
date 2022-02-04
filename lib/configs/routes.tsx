import React from 'react'
import { Home, Search, Person } from '@mui/icons-material'

export interface Route {
  path: string
  label: string
  icon?: React.ReactNode
  requireAuth?: boolean
  inNavigationBar?: boolean
}

export const paths = {
  index: '/',
  search: '/search',
  profile: '/profile',
  settings: '/settings',
  cocktail: (id: number) => ({
    pathname: '/cocktail/[id]',
    query: { id }
  }),
  draft: '/draft',
  creatPost: '/create-post'
}

const routes: Route[] = [
  {
    path: paths.index,
    label: 'Home',
    icon: <Home />,
    inNavigationBar: true
  },
  {
    path: paths.search,
    label: 'Search',
    icon: <Search />,
    inNavigationBar: true
  },
  {
    path: paths.profile,
    label: 'Profile',
    icon: <Person />,
    requireAuth: true,
    inNavigationBar: true
  },
  {
    path: paths.draft,
    label: 'Draft',
    requireAuth: true
  },
  {
    path: paths.settings,
    label: 'Settings',
    requireAuth: true
  },
  {
    path: paths.creatPost,
    label: 'Create Post',
    requireAuth: true
  }
]

export default routes
