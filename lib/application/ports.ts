import {
  CocktailPost,
  CocktailPostDraft,
  CocktailPostDraftList,
  CocktailPostItem,
  FavoriteCocktailItem,
  FavoriteCocktailList
} from 'lib/domain/cocktail'
import { Ingredient, Step } from 'lib/domain/cocktail'
import { User } from 'lib/domain/user'

export interface FetchResponse<T> {
  data: T | undefined
  error: Error
  isValidating: boolean
  mutate: () => void
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
  mutate: () => Promise<unknown>
  retry: () => Promise<unknown>
}

export interface CocktailPostForm {
  title: string
  description: string
  ingredients: Ingredient[]
  steps: Step[]
  photos: FileList | null
}

export interface UpdateUserForm {
  username: string
  file?: FileList
  isCollectionPublic: boolean
}

export interface LocalStorageService {
  setToken(token: string): void
  getToken(): string | null
  removeToken(): void
}

export interface AuthService {
  login(code: string): Promise<string | undefined>
  logout(userId: number): Promise<void>
  askUserPermission(): void
}

export interface UserService {
  getUserInfo(): FetchResponse<User>
  updateUserInfo(form: UpdateUserForm): Promise<void>
}

export interface CocktailListService {
  getList(): InfiniteFetchResponse<CocktailPostItem>
}

export interface CocktailService {
  getById(): FetchResponse<CocktailPost>
}

export interface DraftListService {
  getList(): FetchResponse<CocktailPostDraftList>
  deleteByIds(ids: number[], token: string): Promise<void>
}

export interface DraftService {
  getById(): FetchResponse<CocktailPostDraft>
}

export interface PostEditorService {
  createPost(draft: CocktailPostForm, token: string): Promise<void>
  updatePost(id: number, post: CocktailPostForm, token: string): Promise<void>
  createDraft(draft: CocktailPostForm, token: string): Promise<void>
  updateDraft(id: number, draft: CocktailPostForm, token: string): Promise<void>
  toFormal(id: number, token: string): Promise<void>
}

export interface FavoriteCocktailListService {
  getList(): FetchResponse<FavoriteCocktailList>
  remove(cocktailId: number, token: string): Promise<void>
}

export interface FavoriteCocktailUpdateService {
  collect(cocktailId: number, token: string): Promise<void>
  remove(cocktailId: number, token: string): Promise<void>
}

export interface MyCocktailListService {
  getList(): FetchResponse<FavoriteCocktailItem[]>
  deleteById(cocktailId: number, token: string): Promise<void>
}
