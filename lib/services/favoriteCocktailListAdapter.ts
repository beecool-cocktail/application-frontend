import useSWR from 'swr'
import { FavoriteCocktailListService } from 'lib/application/ports'
import { FavoriteCocktailItem } from 'lib/domain/cocktail'
import { GetUserFavoriteCocktailListResponse } from 'sdk'
import { userApi } from './api'

const path = '/users/current/favorite-cocktails'

const useFavoriteCocktailListService = (
  token: string | null
): FavoriteCocktailListService => {
  const getKey = () => {
    if (!token) return null
    return [path, token]
  }
  const {
    data: resData,
    error,
    mutate,
    isValidating
  } = useSWR<GetUserFavoriteCocktailListResponse>(getKey)

  const getList = () => {
    let data: FavoriteCocktailItem[] | undefined = undefined
    if (resData) {
      data =
        resData.favorite_cocktail_list.map(cocktailItem => ({
          id: cocktailItem.cocktail_id,
          title: cocktailItem.title,
          photoUrl: cocktailItem.photo,
          userName: cocktailItem.user_name
        })) || []
    }
    return {
      data,
      error,
      mutate,
      isValidating
    }
  }

  const remove = async (cocktailId: number, token: string) => {
    await userApi.removeCollectionArticle(cocktailId, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return { getList, remove }
}

export default useFavoriteCocktailListService
