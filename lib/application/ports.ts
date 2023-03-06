import {
  CocktailListPage,
  CocktailPost,
  CocktailPostDraft,
  CocktailPostDraftList,
  CocktailPostForm,
  FavoriteCocktailList,
  MyCocktailItem
} from 'lib/domain/cocktail'
import {
  User,
  CurrentUser,
  UpdateUserInfoForm,
  UpdateUserAvatarForm
} from 'lib/domain/user'

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
  getCurrentUserInfo(token: string): Promise<CurrentUser>
  getOtherUserInfo(id: number): Promise<User>
  updateCurrentUserInfo(form: UpdateUserInfoForm, token: string): Promise<void>
  updateCurrentUserAvatar(
    form: UpdateUserAvatarForm,
    token: string
  ): Promise<void>
  deleteCurrentUserAvatar(token: string): Promise<void>
}

export interface CocktailService {
  getList(
    page: number,
    pageSize: number,
    keyword: string,
    token: string
  ): Promise<CocktailListPage>
  getById(id: number, token: string | null): Promise<CocktailPost>
}

export interface DraftService {
  getList(token: string): Promise<CocktailPostDraftList>
  getById(draftId: number, token: string): Promise<CocktailPostDraft>
  deleteByIds(ids: number[], token: string): Promise<void>
}

export interface PostEditorService {
  createPost(draft: CocktailPostForm, token: string): Promise<void>
  updatePost(id: number, post: CocktailPostForm, token: string): Promise<void>
  createDraft(draft: CocktailPostForm, token: string): Promise<void>
  updateDraft(id: number, draft: CocktailPostForm, token: string): Promise<void>
  toFormal(id: number, token: string): Promise<void>
}

export interface FavoriteCocktailListService {
  getSelfList(token: string): Promise<FavoriteCocktailList>
  getOtherList(
    userId: number,
    token: string | null
  ): Promise<FavoriteCocktailList>
  collect(cocktailId: number, token: string): Promise<void>
  remove(cocktailId: number, token: string): Promise<string>
}

export interface MyCocktailListService {
  getSelfList(token: string): Promise<MyCocktailItem[]>
  getOtherList(userId: number, token: string): Promise<MyCocktailItem[]>
  deleteById(cocktailId: number, token: string): Promise<void>
}

export interface CommandService {
  undoCommand(id: string, token: string): Promise<void>
}
