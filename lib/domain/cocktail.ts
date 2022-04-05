export interface Step {
  description: string
}

export interface Ingredient {
  name: string
  amount: string
}

export interface Photo {
  id: number
  path: string
}

export interface CocktailPost {
  id: number
  userId: number
  userName: string
  title: string
  description: string
  photos: Photo[]
  ingredients: Ingredient[]
  steps: Step[]
}

export interface CocktailPostItem {
  id: number
  userId: number
  userName: string
  title: string
  photoUrls: string[]
  ingredients: Ingredient[]
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

export interface FetchResponse<T> {
  data: T | undefined
  error: Error
}

export interface InfiniteFetchResponse<T> {
  data: T[][]
  total: number
  error: Error
  isLoadingInitialData: boolean
  isLoadingMore: boolean
  isEmpty: boolean
  isReachingEnd: boolean
  isRefreshing: boolean
  loadMore(): void
}
