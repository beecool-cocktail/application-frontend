import { Page } from './pagination'
import { EditablePhoto, Photo, PhotoWithBlur, UploadOrEditPhoto } from './photo'

export interface Step {
  description: string
}

export type CocktailListPage = Page<CocktailPostItem>

export interface Ingredient {
  name: string
  amount: string
}

export interface CocktailPost {
  id: number
  userId: number
  userName: string
  userPhoto: string
  title: string
  description: string
  photos: Photo[]
  ingredients: Ingredient[]
  steps: Step[]
  isCollected: boolean
  createdDate: string
}

export interface CocktailPostPreview {
  id: number
  userId: number
  userName: string
  userPhoto: string
  title: string
  description: string
  photos: string[]
  ingredients: Ingredient[]
  steps: Step[]
  isCollected: boolean
}

export interface CocktailPostItem {
  id: number
  userId: number
  userName: string
  title: string
  photos: PhotoWithBlur[]
  ingredients: Ingredient[]
  isCollected: boolean
}

export interface CocktailPostList {
  data: CocktailPostItem[]
  totalCount: number
}

export interface CocktailPostDraft {
  id: number
  title: string
  description: string
  photos: Photo[]
  ingredients: Ingredient[]
  steps: Step[]
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

export interface CocktailPostDraftItem {
  id: number
  title: string
  description: string
  coverPhotoUrl: string
}

export interface CocktailPostDraftList {
  data: CocktailPostDraftItem[]
  totalCount: number
}

export interface FavoriteCocktailList {
  data: FavoriteCocktailItem[]
  isPublic: boolean
}

export interface ProfileCocktailItem {
  id: number
  userName: string
  title: string
  photoUrl: string
}

export interface MyCocktailItem extends ProfileCocktailItem {
  createdDate: string
  collected?: boolean
}

export interface FavoriteCocktailItem extends ProfileCocktailItem {
  collected: boolean
  collectedDate: string
}

export const collectCocktailItem = (
  cocktail: CocktailPostItem
): CocktailPostItem => ({
  ...cocktail,
  isCollected: !cocktail.isCollected
})

export const collectCocktail = (cocktail: CocktailPost): CocktailPost => ({
  ...cocktail,
  isCollected: !cocktail.isCollected
})

export const toCocktailCreateForm = (
  form: CocktailPostForm
): CocktailPostCreateForm => ({
  ...form,
  photos: form.photos.map(p => p.editedURL)
})

export const toCocktailUpdateForm = (
  form: CocktailPostForm
): CocktailPostUpdateForm => ({
  ...form,
  photos: form.photos.map(p => {
    return {
      id: p.id,
      imageFile: p.shouldUploadImageFile ? p.editedURL : undefined
    }
  })
})
