import { CocktailApi, UserApi, LoginApi, CommandApi, Configuration } from 'sdk'
import cornerApi from './cornerApi'

const config = new Configuration({ basePath: '.' })

export const cocktailApi = new CocktailApi(config, undefined, cornerApi)
export const userApi = new UserApi(config, undefined, cornerApi)
export const loginApi = new LoginApi(config, undefined, cornerApi)
export const commandApi = new CommandApi(config, undefined, cornerApi)
