import React from 'react'
import { Home, Search, Person } from '@mui/icons-material'

export interface Route {
  path: string
  label: string
  icon?: React.ReactNode
  requireAuth?: boolean
  inNavigationBar?: boolean
}

export const getUrlById = (path: string, id: string | number) => ({
  pathname: path,
  query: { id }
})

export enum paths {
  index = '/',
  search = '/search',
  profile = '/profile',
  settings = '/profile/settings',
  drafts = '/profile/drafts',
  draftById = '/profile/drafts/[id]',
  cocktailById = '/cocktails/[id]',
  creatPost = '/create-post'
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
    path: paths.drafts,
    label: 'Draft',
    requireAuth: false
  },
  {
    path: paths.settings,
    label: 'Settings',
    requireAuth: true
  },
  {
    path: paths.creatPost,
    label: 'Create Post',
    requireAuth: false
  }
]

export default routes
