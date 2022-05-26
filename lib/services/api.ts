import { CocktailApi, UserApi, LoginApi, Configuration } from 'sdk'

const config = new Configuration({ basePath: '/api' })

export const cocktailApi = new CocktailApi(config)
export const userApi = new UserApi(config)
export const loginApi = new LoginApi(config)
