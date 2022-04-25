import mockUserInfo from './userInfo'
import mockIngredients from './ingredients'
import mockPhotos from './photos'
import type { PopularCocktailList } from 'sdk'

const mockCocktail: PopularCocktailList = {
  cocktail_id: 98078024211279,
  title: 'Gin Tonic',
  photos: mockPhotos.map(p => p.path),
  created_date: '2022-02-17 11:41:18',
  ingredient_list: mockIngredients,
  user_id: mockUserInfo.user_id,
  user_name: mockUserInfo.user_name,
  is_collected: false
}

export default mockCocktail
