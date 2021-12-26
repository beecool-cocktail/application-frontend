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

const cocktailApi = { getCocktails }

export default cocktailApi
