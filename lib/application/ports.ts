import { LoginResult, LoginState } from 'lib/domain/auth'
import {
  CocktailPost,
  CocktailPostDraft,
  FavoriteCocktailList,
  MyCocktailItem
} from 'lib/domain/cocktail'
import { User, CurrentUser } from 'lib/domain/user'
import { CocktailPostDraftList } from './types/cocktail'
import { CocktailPostUpdateForm } from './types/cocktail'
import { CocktailPostCreateForm } from './types/cocktail'
import { UpdateUserInfoForm } from './types/user'
import { UpdateUserAvatarForm } from './types/user'
import { CocktailListPage } from './types/cocktail'

export interface AuthService {
  login(code: string, state: string): Promise<LoginResult>
  logout(userId: number): Promise<void>
  askUserPermission(state: LoginState): void
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
  createPost(draft: CocktailPostCreateForm, token: string): Promise<void>
  updatePost(
    id: number,
    post: CocktailPostUpdateForm,
    token: string
  ): Promise<void>
  createDraft(draft: CocktailPostCreateForm, token: string): Promise<void>
  updateDraft(
    id: number,
    draft: CocktailPostUpdateForm,
    token: string
  ): Promise<void>
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
