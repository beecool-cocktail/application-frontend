import { Ingredient, Step } from './cocktail'

export interface Draft {
  id: string
  title: string
  description: string
  coverPhotoUrl: string
  photos: string
  ingredients: Ingredient[]
  steps: Step[]
}
