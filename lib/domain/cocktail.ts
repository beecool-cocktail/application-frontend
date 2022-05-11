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
  photos: Photo[]
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

export interface CocktailPostDraftItem {
  id: number
  title: string
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

export interface FavoriteCocktailItem {
  id: number
  userName: string
  title: string
  photoUrl: string
}

export interface MyCocktailItem {
  id: number
  userName: string
  title: string
  photoUrl: string
}
