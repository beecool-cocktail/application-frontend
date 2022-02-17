export interface Step {
  description: string
}

export interface Ingredient {
  amount: number
  name: string
  unit: string
}

export type Cocktail = {
  cocktail_id: number
  title: string
  tags?: string[]
  photo: string
  created_date: string
}

export interface CocktailPostBase {
  title: string
  description: string
  ingredients: Ingredient[]
  steps: Step[]
}

export interface CocktailPostForm extends CocktailPostBase {
  photos: FileList | null
}

export interface CocktailPost extends CocktailPostBase {
  photos: string[]
}

export interface CocktailPostWithId extends CocktailPost {
  id: number
}

export interface CocktailList {
  total: number
  popular_cocktail_list: Cocktail[]
}
