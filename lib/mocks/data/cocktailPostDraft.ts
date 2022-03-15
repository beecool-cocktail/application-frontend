import mockIngredients from './ingredients'
import mockSteps from './steps'
import type { CocktailPostDraft } from 'lib/types/cocktail'

const mockCocktailPostDraft: CocktailPostDraft = {
  id: '1',
  title: 'Gin Tonic',
  description: 'description',
  ingredients: mockIngredients,
  steps: mockSteps,
  photos: []
}

export default mockCocktailPostDraft
