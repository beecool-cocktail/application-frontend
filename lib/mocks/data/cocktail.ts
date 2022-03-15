import mockUserInfo from './userInfo'
import mockSteps from './steps'
import mockIngredients from './ingredients'
import type { CocktailPost } from 'lib/types/cocktail'

const mockCocktailPost: CocktailPost = {
  title: 'Gin Tonic',
  description:
    'this is side car this is side car this is side carcar this is side carcar this is side carcar this is side carcar this is side car',
  photos: ['/cocktail.jpg'],
  steps: mockSteps,
  ingredients: mockIngredients,
  userInfo: mockUserInfo
}

export default mockCocktailPost
