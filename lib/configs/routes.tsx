import { ParsedUrlQueryInput } from 'querystring'
import React from 'react'
import Search from 'lib/assets/search.svg'
import PlusAdd from 'lib/assets/plusAdd.svg'
import Profile from 'lib/assets/profile.svg'
import Home from 'lib/assets/home.svg'

export interface Route {
  path: string
  label: string
  icon?: React.ReactNode
  requireAuth?: boolean
  inNavigationBar?: boolean
}

export const getUrlByQuery = (path: string, query: ParsedUrlQueryInput) => ({
  pathname: path,
  query
})

export const getUrlById = (path: string, id: string | number) =>
  getUrlByQuery(path, { id })

export const pathname = {
  index: '/',
  search: '/search',
  profile: '/profile',
  settings: '/profile/settings',
  editUsername: '/profile/settings/edit-username',
  changeAvatar: '/profile/settings/change-avatar',
  editAvatar: '/profile/settings/edit-avatar',
  drafts: '/profile/drafts',
  draftById: '/profile/drafts/[id]',
  cocktailById: '/cocktails/[id]',
  createPost: '/create-post',
  editPost: '/profile/cocktails/[id]',
  userById: '/users/[id]'
}

export const paths = {
  ...pathname,
  draftById: (id: number) => getUrlById(pathname.draftById, id),
  cocktailById: (id: number) => getUrlById(pathname.cocktailById, id),
  editPost: (id: number, backToCocktailPage?: boolean) => {
    const query: { id: number; backToCocktailPage?: true } = { id }
    if (backToCocktailPage) query.backToCocktailPage = true
    return getUrlByQuery(pathname.editPost, query)
  },
  userById: (id: number) => getUrlById(pathname.userById, id)
}

const routes: Route[] = [
  {
    path: pathname.index,
    label: 'Home',
    icon: <Home />,
    inNavigationBar: true
  },
  {
    path: pathname.search,
    label: 'Search',
    icon: <Search />,
    inNavigationBar: true
  },
  {
    path: pathname.createPost,
    label: 'Create Post',
    icon: <PlusAdd />,
    requireAuth: true,
    inNavigationBar: true
  },
  {
    path: pathname.profile,
    label: 'Profile',
    icon: <Profile />,
    requireAuth: true,
    inNavigationBar: true
  },
  {
    path: pathname.drafts,
    label: 'Draft',
    requireAuth: false
  },
  {
    path: pathname.draftById,
    label: 'draft'
  },
  {
    path: pathname.cocktailById,
    label: 'cocktail by id'
  },
  {
    path: pathname.settings,
    label: 'Settings',
    requireAuth: true
  },
  {
    path: pathname.editUsername,
    label: 'Edit Username',
    requireAuth: true
  },
  {
    path: pathname.changeAvatar,
    label: 'Change Avatar',
    requireAuth: true
  },
  {
    path: pathname.editAvatar,
    label: 'Edit Avatar',
    requireAuth: true
  },
  {
    path: pathname.editPost,
    label: 'Edit Post'
  },
  {
    path: pathname.userById,
    label: 'User'
  }
]

export default routes
