import userInfo from './userInfo'
import ingredients from './ingredients'
import type { Cocktail } from '../../types/cocktail'

const sharedProps = {
  photos: ['/cocktail.jpg'],
  tags: [],
  ingredients: ingredients,
  created_date: '',
  userInfo: userInfo
}

const mockCocktails: Cocktail[] = [
  {
    cocktail_id: 1,
    title: 'Sidecar',
    ...sharedProps
  },
  {
    cocktail_id: 2,
    title: 'Old Fashion',
    ...sharedProps
  },
  {
    cocktail_id: 3,
    title: 'Old Fashion',
    ...sharedProps
  },
  {
    cocktail_id: 4,
    title: 'Old Fashion',
    ...sharedProps
  },
  {
    cocktail_id: 5,
    title: 'Old Fashion',
    ...sharedProps
  },
  {
    cocktail_id: 6,
    title: 'Old Fashion',
    ...sharedProps
  },
  {
    cocktail_id: 7,
    title: 'Old Fashion',
    ...sharedProps
  },
  {
    cocktail_id: 8,
    title: 'Old Fashion',
    ...sharedProps
  },
  {
    cocktail_id: 9,
    title: 'Old Fashion',
    ...sharedProps
  }
]

export default mockCocktails
