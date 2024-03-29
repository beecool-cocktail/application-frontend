import { AxiosRequestConfig } from 'axios'
import { CocktailService } from 'lib/application/ports'
import { CocktailPost, CocktailPostItem } from 'lib/domain/cocktail'
import { CocktailListPage } from 'lib/application/types/cocktail'
import { cocktailApi } from './api'

const getById = async (
  id: number,
  token: string | null
): Promise<CocktailPost> => {
  const config: AxiosRequestConfig = {
    headers: { ...(token && { Authorization: `Bearer ${token}` }) }
  }
  const res = await cocktailApi.getCocktailByIDRequest(id, config)
  const cocktail = res.data.data
  const result: CocktailPost = {
    id: cocktail.cocktail_id,
    userId: cocktail.user_id,
    userName: cocktail.user_name,
    userPhoto: cocktail.user_photo,
    title: cocktail.title,
    description: cocktail.description,
    photos: cocktail.photos.map(p => ({
      id: p.id,
      path: p.image_path,
      blurPath: p.blur_image_data_url
    })),
    ingredients: cocktail.ingredient_list.map(i => ({
      name: i.name,
      amount: i.amount
    })),
    steps: cocktail.step_list.map(s => ({ description: s.description })),
    isCollected: cocktail.is_collected,
    createdDate: cocktail.created_date
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
        photos: cocktail.photos.map(p => ({
          id: p.id,
          path: p.image_path,
          blurPath: p.blur_image_data_url
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
