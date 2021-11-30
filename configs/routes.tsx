import { Home, Search, Person } from '@mui/icons-material'

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

export default routes
