import useSWR from 'swr'
import { MyCocktailListService } from 'lib/application/ports'
import { MyCocktailItem } from 'lib/domain/cocktail'
import { DeleteFormalArticleRequest, GetSelfCocktailListResponse } from 'sdk'
import { cocktailApi } from './api'

const useMyCocktailListService = (
  token: string | null,
  id?: number
): MyCocktailListService => {
  const getKey = () => {
    if (!token) return null
    const user = id ? id : 'current'
    const path = `/users/${user}/cocktails`
    return [path, token]
  }

  const {
    data: resData,
    error,
    mutate,
    isValidating
  } = useSWR<GetSelfCocktailListResponse>(getKey)

  const getList = () => {
    let data: MyCocktailItem[] | undefined = undefined
    if (resData) {
      data = resData.cocktail_list.map(cocktailItem => ({
        id: cocktailItem.cocktail_id,
        title: cocktailItem.title,
        photoUrl: cocktailItem.photo,
        userName: cocktailItem.user_name
      }))
    }
    return {
      data,
      error,
      mutate,
      isValidating
    }
  }

  const deleteById = async (cocktailId: number, token: string) => {
    const req: DeleteFormalArticleRequest = { deleted_ids: [cocktailId] }
    const res = await cocktailApi.deleteFormalArticleRequest(req, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  }

  return { getList, deleteById }
}

export default useMyCocktailListService
