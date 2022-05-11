import useSWR from 'swr'
import { FavoriteCocktailListService } from 'lib/application/ports'
import { FavoriteCocktailList } from 'lib/domain/cocktail'
import { GetUserFavoriteCocktailListResponse } from 'sdk'
import { userApi } from './api'

const useFavoriteCocktailListService = (
  token: string | null,
  id?: number
): FavoriteCocktailListService => {
  const getKey = () => {
    if (!token) return null
    const user = id ? id : 'current'
    const path = `/users/${user}/favorite-cocktails`
    return [path, token]
  }
  const {
    data: resData,
    error,
    mutate,
    isValidating
  } = useSWR<GetUserFavoriteCocktailListResponse>(getKey)

  const getList = () => {
    let data: FavoriteCocktailList | undefined = undefined
    if (resData) {
      data = {
        data:
          resData.favorite_cocktail_list.map(cocktailItem => ({
            id: cocktailItem.cocktail_id,
            title: cocktailItem.title,
            photoUrl: cocktailItem.photo,
            userName: cocktailItem.user_name
          })) || [],
        isPublic: resData.is_public
      }
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
