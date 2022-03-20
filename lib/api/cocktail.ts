import { toBase64 } from 'lib/helper/image'
import { CocktailList } from '../types/cocktail'
import { ApiResponse } from '../types/api/responseBase'
import { CocktailPostForm } from '../types/cocktail'
import cornerApi from './cornerApi'

const getReqPayload = async (form: CocktailPostForm) => {
  let files: string[] = []
  if (form.photos) {
    const promiseObjs = Array.from(form.photos).map(toBase64)
    files = await Promise.all(promiseObjs)
  }
  const req = {
    name: form.title,
    ingredient_list: form.ingredient_list.map(({ amount, ...props }) => {
      return { ...props, amount: Number(amount) }
    }),
    step_list: form.step_list,
    description: form.description,
    files
  }
  return req
}

const getCocktails = async (page = 1, page_size = 10) => {
  const res = await cornerApi.get<ApiResponse<CocktailList>>('/cocktails', {
    params: { page, page_size }
  })
  return res.data.data
}

const getCocktailById = async (id: string) => {
  const res = await cornerApi.get<ApiResponse<CocktailList>>(`/cocktails/${id}`)
  return res.data.data.popular_cocktail_list[0]
}

const createCocktailPost = async (form: CocktailPostForm, token: string) => {
  const req = await getReqPayload(form)
  const res = await cornerApi.post<ApiResponse<null>>('/cocktails', req, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.data
}

const createCocktailPostDraft = async (
  form: CocktailPostForm,
  token: string
) => {
  const req = await getReqPayload(form)
  const res = await cornerApi.post<ApiResponse<null>>('/cocktail-drafts', req, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.data
}

const cocktailApi = {
  getCocktails,
  getCocktailById,
  createCocktailPost,
  createCocktailPostDraft
}

export default cocktailApi
