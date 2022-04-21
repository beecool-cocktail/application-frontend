import { MyCocktailListService } from 'lib/application/ports'
import { MyCocktailItem } from 'lib/domain/cocktail'
import useCornerSWR from 'lib/hooks/useCornerSWR'
import { GetSelfCocktailListResponse } from 'sdk'

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteById = async (cocktailId: number, token: string) => {
    // TODO
    // await userApi.removeCollectionArticle(cocktailId, {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
  }

  return { getList, deleteById }
}

export default useMyCocktailListService
