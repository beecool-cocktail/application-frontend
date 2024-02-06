import { Photo, PhotoWithBlur } from './photo'

export interface Step {
  description: string
}

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
  photos: PhotoWithBlur[]
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

export interface CocktailPostDraft {
  id: number
  title: string
  description: string
  photos: Photo[]
  ingredients: Ingredient[]
  steps: Step[]
}

export interface CocktailPostDraftItem {
  id: number
  title: string
  description: string
  coverPhotoUrl: string
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
