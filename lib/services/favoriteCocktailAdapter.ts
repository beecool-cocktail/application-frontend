import { FavoriteCocktailListService } from 'lib/application/ports'
import { FavoriteCocktailList } from 'lib/domain/cocktail'
import { CollectArticleRequest } from 'sdk'
import { userApi } from './api'

const getSelfList = async (token: string): Promise<FavoriteCocktailList> => {
  const res = await userApi.getUserFavoriteList({
    headers: { Authorization: `Bearer ${token}` }
  })
  const resData = res.data.data
  return {
    data:
      resData.favorite_cocktail_list.map(cocktailItem => ({
        id: cocktailItem.cocktail_id,
        title: cocktailItem.title,
        photoUrl: cocktailItem.photo,
        userName: cocktailItem.user_name,
        collected: cocktailItem.is_collected
      })) || [],
    isPublic: resData.is_public
  }
}

const getOtherList = async (userId: number): Promise<FavoriteCocktailList> => {
  const res = await userApi.getOtherUserFavoriteList(userId)
  const resData = res.data.data
  return {
    data:
      resData.favorite_cocktail_list.map(cocktailItem => ({
        id: cocktailItem.cocktail_id,
        title: cocktailItem.title,
        photoUrl: cocktailItem.photo,
        userName: cocktailItem.user_name,
        collected: cocktailItem.is_collected
      })) || [],
    isPublic: resData.is_public
  }
}

const collect = async (cocktailId: number, token: string) => {
  const req: CollectArticleRequest = { id: cocktailId }
  await userApi.collectArticleRequest(req, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const remove = async (cocktailId: number, token: string) => {
  const res = await userApi.removeCollectionArticle(cocktailId, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.data.command_id
}

const favoriteCocktailService: FavoriteCocktailListService = {
  getSelfList,
  getOtherList,
  collect,
  remove
}

export default favoriteCocktailService
