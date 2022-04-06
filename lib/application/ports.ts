import {
  FetchResponse,
  CocktailPost,
  CocktailPostDraft,
  CocktailPostDraftList,
  InfiniteFetchResponse,
  CocktailPostItem
} from 'lib/domain/cocktail'
import { Ingredient, Step } from 'lib/domain/cocktail'

export interface CocktailPostForm {
  title: string
  description: string
  ingredients: Ingredient[]
  steps: Step[]
  photos: FileList | null
}

export interface LocalStorageService {
  setToken(token: string): void
  getToken(): string | null
  removeToken(): void
}

export interface UserService {
  getUserInfo(): void
  updateUserInfo(): void
}

export interface AuthService {
  login(): void
  logout(): void
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
  createDraft(draft: CocktailPostForm, token: string): Promise<void>
  updateDraft(id: number, draft: CocktailPostForm, token: string): Promise<void>
  toFormal(id: number, token: string): Promise<void>
}
