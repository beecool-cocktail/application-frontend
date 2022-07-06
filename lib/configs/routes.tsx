import React from 'react'
import Home from 'lib/assets/home/default.svg'
import Search from 'lib/assets/search/default.svg'
import PlusAdd from 'lib/assets/plusAdd/default.svg'
import Profile from 'lib/assets/profile/default.svg'

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
  createPost = '/create-post',
  editPost = '/profile/cocktails/[id]',
  userById = '/users/[id]'
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
    path: paths.createPost,
    label: 'Create Post',
    icon: <PlusAdd />,
    requireAuth: true,
    inNavigationBar: true
  },
  {
    path: paths.profile,
    label: 'Profile',
    icon: <Profile />,
    requireAuth: true,
    inNavigationBar: true
  },
  {
    path: paths.drafts,
    label: 'Draft',
    requireAuth: false
  },
  {
    path: paths.draftById,
    label: 'draft'
  },
  {
    path: paths.cocktailById,
    label: 'cocktail by id'
  },
  {
    path: paths.settings,
    label: 'Settings',
    requireAuth: true
  },
  {
    path: paths.editPost,
    label: 'Edit Post'
  },
  {
    path: paths.userById,
    label: 'User'
  }
]

export default routes
