import { FavoriteCocktailListService } from 'lib/application/ports'
import { FavoriteCocktailItem } from 'lib/domain/cocktail'
import useCornerSWR from 'lib/hooks/useCornerSWR'
import { GetUserFavoriteCocktailListResponse } from 'sdk'
import { userApi } from './api'

const useFavoriteCocktailListService = (): FavoriteCocktailListService => {
  const {
    data: resData,
    error,
    mutate,
    isValidating
  } = useCornerSWR<GetUserFavoriteCocktailListResponse>(
    '/users/current/favorite-cocktails',
    { auth: true }
  )
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
