import mockCocktail from './cocktail'
import type { GetPopularCocktailListResponse } from 'sdk'

const mockCocktailList: GetPopularCocktailListResponse = {
  total: 18,
  popular_cocktail_list: [
    { ...mockCocktail, cocktail_id: 98078024211279 },
    { ...mockCocktail, cocktail_id: 98026853936941 },
    { ...mockCocktail, cocktail_id: 97902737898357 },
    { ...mockCocktail, cocktail_id: 97871063173135 },
    { ...mockCocktail, cocktail_id: 97871424327134 }
  ]
}

export default mockCocktailList
