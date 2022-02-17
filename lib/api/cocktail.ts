import axios from 'axios'
import { toBase64 } from 'lib/helper/image'
import { CocktailList } from '../types/cocktail'
import { ApiResponse } from '../types/api/responseBase'
import { CocktailPostForm } from '../types/cocktail'

const getCocktails = async (page = 1, page_size = 10) => {
  const res = await axios.get<ApiResponse<CocktailList>>('/api/cocktails', {
    params: { page, page_size }
  })
  return res.data.data
}

const getCocktailById = async (id: string) => {
  const res = await axios.get<ApiResponse<CocktailList>>(`/api/cocktails/${id}`)
  return res.data.data.popular_cocktail_list[0]
}

const createCocktailPost = async (form: CocktailPostForm, token: string) => {
  let files: string[] = []
  if (form.photos) {
    const promiseObjs = Array.from(form.photos).map(toBase64)
    files = await Promise.all(promiseObjs)
  }
  const req = {
    name: form.title,
    ingredient_list: form.ingredients.map(({ amount, ...props }) => {
      return { ...props, amount: Number(amount) }
    }),
    step_list: form.steps,
    description: form.description,
    files
  }
  const res = await axios.post<ApiResponse<null>>('api/cocktails', req, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.data
}

const cocktailApi = { getCocktails, getCocktailById, createCocktailPost }

export default cocktailApi
