import { MyCocktailListService } from 'lib/application/ports'
import { MyCocktailItem } from 'lib/domain/cocktail'
import { DeleteFormalArticleRequest } from 'sdk'
import { cocktailApi, userApi } from './api'

const getSelfList = async (token: string): Promise<MyCocktailItem[]> => {
  const res = await userApi.selfCocktailList({
    headers: { Authorization: `Bearer ${token}` }
  })

  return res.data.data.cocktail_list.map(cocktailItem => ({
    id: cocktailItem.cocktail_id,
    title: cocktailItem.title,
    photoUrl: cocktailItem.photo,
    userName: cocktailItem.user_name,
    createdDate: cocktailItem.created_date
  }))
}

const getOtherList = async (
  userId: number,
  token: string | null
): Promise<MyCocktailItem[]> => {
  const res = await userApi.otherCocktailList(userId, {
    headers: { ...(token && { Authorization: `Bearer ${token}` }) }
  })
  return res.data.data.cocktail_list.map(cocktailItem => ({
    id: cocktailItem.cocktail_id,
    title: cocktailItem.title,
    photoUrl: cocktailItem.photo,
    userName: cocktailItem.user_name,
    collected: cocktailItem.is_collected,
    createdDate: cocktailItem.created_date
  }))
}

const deleteById = async (cocktailId: number, token: string) => {
  const req: DeleteFormalArticleRequest = { deleted_ids: [cocktailId] }
  const res = await cocktailApi.deleteFormalArticleRequest(req, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

const myCocktailListService: MyCocktailListService = {
  getSelfList,
  getOtherList,
  deleteById
}

export default myCocktailListService
