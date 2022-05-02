import { MyCocktailListService } from 'lib/application/ports'
import { MyCocktailItem } from 'lib/domain/cocktail'
import useCornerSWR from 'lib/hooks/useCornerSWR'
import { DeleteFormalArticleRequest, GetSelfCocktailListResponse } from 'sdk'
import { cocktailApi } from './api'

const useMyCocktailListService = (): MyCocktailListService => {
  const {
    data: resData,
    error,
    mutate,
    isValidating
  } = useCornerSWR<GetSelfCocktailListResponse>('/users/current/cocktails', {
    auth: true
  })
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
