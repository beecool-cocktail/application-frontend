import { PaginationResponse } from './api/responseBase'
import { UserInfoBase } from './user'

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
  photos: string[]
  created_date: string
  ingredient_list: Ingredient[]
  user_id: number
  user_name: string
}

export interface CocktailPostBase {
  title: string
  description: string
  ingredient_list?: Ingredient[]
  step_list?: Step[]
}

export interface CocktailPostForm extends CocktailPostBase {
  photos: FileList | null
}

export interface CocktailPost extends CocktailPostBase, UserInfoBase {
  photos: string[]
}

export interface CocktailPostWithId extends CocktailPost {
  id: number
}

export interface CocktailPostDraft extends CocktailPostBase {
  id: string
  photos: string[]
}

export type CocktailList = PaginationResponse<Cocktail>
