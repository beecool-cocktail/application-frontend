import { GetCocktailByIDResponse } from 'sdk'
import mockUserInfo from './userInfo'
import mockIngredients from './ingredients'
import mockSteps from './steps'
import mockPhotos from './photos'

const mockCocktailPost: GetCocktailByIDResponse = {
  cocktail_id: 1,
  title: 'Gin Tonic',
  description: 'Gin Tonic Gin Tonic Gin Tonic Gin Tonic Gin Tonic Gin Tonic',
  photos: mockPhotos.map((p, index) => ({ id: index, path: p.path })),
  step_list: mockSteps,
  ingredient_list: mockIngredients,
  user_id: mockUserInfo.user_id,
  user_name: mockUserInfo.user_name,
  user_photo: mockUserInfo.photo,
  is_collected: false,
  created_date: ''
}

export default mockCocktailPost
