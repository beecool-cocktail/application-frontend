import { AxiosRequestConfig } from 'axios'
import { CocktailService } from 'lib/application/ports'
import {
  CocktailListPage,
  CocktailPost,
  CocktailPostItem
} from 'lib/domain/cocktail'
import { cocktailApi } from './api'

const getById = async (
  id: number,
  token: string | null
): Promise<CocktailPost> => {
  const config: AxiosRequestConfig = {
    headers: { ...(token && { Authorization: `Bearer ${token}` }) }
  }
  const res = await cocktailApi.getCocktailByIDRequest(id, config)
  const resData = res.data.data
  const result: CocktailPost = {
    id: resData.cocktail_id,
    userId: resData.user_id,
    userName: resData.user_name,
    userPhoto: resData.user_photo,
    title: resData.title,
    description: resData.description,
    photos: resData.photos.map(p => ({ id: p.id, path: p.image_path })),
    ingredients: resData.ingredient_list.map(i => ({
      name: i.name,
      amount: i.amount
    })),
    steps: resData.step_list.map(s => ({ description: s.description })),
    isCollected: resData.is_collected,
    createdDate: resData.created_date
  }

  return result
}

const getList = async (
  pageIndex: number,
  pageSize: number,
  keyword: string,
  token: string | null
): Promise<CocktailListPage> => {
  const config: AxiosRequestConfig = {
    headers: { ...(token && { Authorization: `Bearer ${token}` }) }
  }
  const res = await cocktailApi.getCocktail(
    pageIndex,
    pageSize,
    keyword,
    config
  )
  const resData = res.data.data
  const result: CocktailListPage = {
    total: resData.total,
    data: resData.popular_cocktail_list.map(cocktail => {
      const cocktailPost: CocktailPostItem = {
        id: cocktail.cocktail_id,
        userId: cocktail.user_id,
        userName: cocktail.user_name,
        title: cocktail.title,
        photos: cocktail.photos.map((p, index) => ({
          path: p,
          blurPath: cocktail.low_quality_photos[index]
        })),
        ingredients: cocktail.ingredient_list.map(i => ({
          name: i.name,
          amount: i.amount
        })),
        isCollected: cocktail.is_collected
      }
      return cocktailPost
    })
  }

  return result
}

const cocktailService: CocktailService = { getList, getById }

export default cocktailService
