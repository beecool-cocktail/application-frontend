import { ParsedUrlQueryInput } from 'querystring'
import { ToggleIconArtboard } from 'components/common/animationToggleIcon'

export interface Route {
  path: string
  label: string
  requireAuth?: boolean
  showTabBar?: boolean
  tabBarIcon?: ToggleIconArtboard | JSX.Element
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
  collections: '/profile/collections',
  settings: '/settings',
  editName: '/settings/edit-name',
  changeAvatar: '/settings/change-avatar',
  editAvatar: '/settings/edit-avatar',
  drafts: '/profile/drafts',
  draftById: '/profile/drafts/[id]',
  cocktailById: '/cocktails/[id]',
  createPost: '/create-post',
  editPost: '/profile/cocktails/[id]/edit',
  userById: '/users/[id]',
  userCollectionsById: '/users/[id]/collections',
  aboutUs: '/about-us'
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
  userById: (id: number) => getUrlById(pathname.userById, id),
  userCollectionsById: (id: number) =>
    getUrlById(pathname.userCollectionsById, id)
}

const routes: Route[] = [
  {
    path: pathname.index,
    label: 'Home',
    tabBarIcon: 'Home',
    showTabBar: true
  },
  {
    path: pathname.search,
    label: 'Search',
    tabBarIcon: 'Search',
    showTabBar: true
  },
  {
    path: pathname.createPost,
    label: 'Create Post',
    requireAuth: true,
    tabBarIcon: 'Add'
  },
  {
    path: pathname.profile,
    label: 'Profile',
    tabBarIcon: 'Profile',
    showTabBar: true
  },
  {
    path: pathname.collections,
    label: 'Collections',
    tabBarIcon: 'Profile',
    showTabBar: true
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
    path: pathname.editName,
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
  },
  {
    path: pathname.userCollectionsById,
    label: 'User Collection'
  },
  {
    path: pathname.aboutUs,
    label: 'About Us'
  }
]

export default routes
