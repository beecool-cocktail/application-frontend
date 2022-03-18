import mockCocktail from './cocktail'
import type { Cocktail } from 'lib/types/cocktail'
import type { PaginationResponse } from 'lib/types/api/responseBase'

const mockCocktailList: PaginationResponse<Cocktail> = {
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
