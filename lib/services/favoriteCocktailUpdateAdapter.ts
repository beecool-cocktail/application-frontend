import { FavoriteCocktailUpdateService } from 'lib/application/ports'
import { CollectArticleRequest } from 'sdk'
import { userApi } from './api'

const useFavoriteCocktailUpdateService = (): FavoriteCocktailUpdateService => {
  const collect = async (cocktailId: number, token: string) => {
    const req: CollectArticleRequest = { id: cocktailId }
    await userApi.collectArticleRequest(req, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  const remove = async (cocktailId: number, token: string) => {
    await userApi.removeCollectionArticle(cocktailId, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return { collect, remove }
}

export default useFavoriteCocktailUpdateService
