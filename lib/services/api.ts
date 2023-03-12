import { CocktailApi, UserApi, LoginApi, CommandApi } from 'sdk'
import cornerApi from './cornerApi'

export const cocktailApi = new CocktailApi(undefined, undefined, cornerApi)
export const userApi = new UserApi(undefined, undefined, cornerApi)
export const loginApi = new LoginApi(undefined, undefined, cornerApi)
export const commandApi = new CommandApi(undefined, undefined, cornerApi)
