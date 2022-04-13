import { CocktailApi, Configuration, UserApi } from 'sdk'

const configuration = new Configuration()

export const cocktailApi = new CocktailApi(configuration, '/api')
export const userApi = new UserApi(configuration, '/api')
