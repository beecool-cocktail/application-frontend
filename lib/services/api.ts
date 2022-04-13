import { CocktailApi, UserApi, LoginApi, Configuration } from 'sdk'

const config = new Configuration()

export const cocktailApi = new CocktailApi(config, '/api')
export const userApi = new UserApi(config, '/api')
export const loginApi = new LoginApi(config, '/api')
