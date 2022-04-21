import { PaginationResponse } from './responseBase'
import { UserInfoBase } from './user'

export interface CocktailPostForm {
  title: string
  description: string
  ingredients: Ingredient[]
  steps: Step[]
  photos: FileList | null
}

export interface Step {
  description: string
}

export interface Ingredient {
  amount: string
  name: string
}

export interface PhotoWithId {
  id: number
  path: string
}

export type Cocktail = {
  cocktail_id: number
  title: string
  tags?: string[]
  photos: string[]
  created_date: string
  ingredient_list: Ingredient[]
  user_id: number
  user_name: string
}

export interface CocktailPostBase {
  title: string
  description: string
  ingredient_list: Ingredient[]
  step_list: Step[]
}

export interface CocktailPost extends CocktailPostBase, UserInfoBase {
  cocktail_id: number
  photos: PhotoWithId[]
}

export interface CocktailPostWithId extends CocktailPost {
  id: number
}

export interface CocktailPostDraft extends CocktailPostBase {
  cocktail_id: number
  photos: PhotoWithId[]
}

export interface CocktailPostDraftItem {
  cocktail_id: number
  title: string
  created_date: string
  photo: string
}

export type CocktailList = PaginationResponse<Cocktail>

export type CocktailDraftList = {
  draft_cocktail_list: CocktailPostDraftItem[]
  total: number
}
