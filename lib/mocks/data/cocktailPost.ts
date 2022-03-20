import mockUserInfo from './userInfo'
import mockIngredients from './ingredients'
import mockSteps from './steps'
import mockPhotos from './photos'
import type { CocktailPost } from 'lib/types/cocktail'

const mockCocktailPost: CocktailPost = {
  cocktail_id: 1,
  title: 'Gin Tonic',
  description: 'Gin Tonic Gin Tonic Gin Tonic Gin Tonic Gin Tonic Gin Tonic',
  photos: mockPhotos,
  step_list: mockSteps,
  ingredient_list: mockIngredients,
  user_id: mockUserInfo.user_id,
  user_name: mockUserInfo.user_name
}

export default mockCocktailPost
