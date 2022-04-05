import {
  FetchResponse,
  CocktailPost,
  CocktailPostDraft,
  CocktailPostDraftList,
  InfiniteFetchResponse,
  CocktailPostItem
} from 'lib/domain/cocktail'

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
  update(draft: CocktailPostDraft): Promise<void>
  toFormal(): Promise<void>
}
