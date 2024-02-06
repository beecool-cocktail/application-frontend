import { CocktailPostItem } from 'lib/domain/cocktail'
import { Ingredient, Step } from 'lib/domain/cocktail'
import { EditablePhoto, UploadOrEditPhoto } from 'lib/domain/photo'
import { CocktailPostDraftItem } from 'lib/domain/cocktail'
import { Page } from './pagination'

export type CocktailListPage = Page<CocktailPostItem>

export interface CocktailPostList {
  data: CocktailPostItem[]
  totalCount: number
}

export interface CocktailPostStep1Form {
  title: string
  ingredients: Ingredient[]
  steps: Step[]
}

export interface CocktailPostStep2Form {
  photos: EditablePhoto[]
  description: string
}

export interface CocktailPostForm
  extends CocktailPostStep1Form,
    CocktailPostStep2Form {}

export interface CocktailPostCreateForm
  extends Omit<CocktailPostForm, 'photos'> {
  photos: string[]
}

export interface CocktailPostUpdateForm
  extends Omit<CocktailPostForm, 'photos'> {
  photos: UploadOrEditPhoto[]
}

export interface CocktailPostDraftList {
  data: CocktailPostDraftItem[]
  totalCount: number
}
