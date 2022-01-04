import axios from 'axios'
import { Cocktail } from '../types/cocktail'
import { ApiResponse } from './responseBase'

export interface CocktailList {
  total: number
  popular_cocktail_list: Cocktail[]
}

const getCocktails = async (page = 1, page_size = 10) => {
  const response = await axios.get<ApiResponse<CocktailList>>(
    '/api/cocktails',
    { params: { page, page_size } }
  )
  return response.data.data
}

const getCocktailById = async (id: string) => {
  const response = await axios.get<ApiResponse<CocktailList>>(
    '/api/cocktails',
    { params: { page: 1, page_size: 10 } }
  )
  return response.data.data.popular_cocktail_list[0]
}

const cocktailApi = { getCocktails, getCocktailById }

export default cocktailApi
