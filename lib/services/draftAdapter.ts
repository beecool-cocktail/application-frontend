import useSWR from 'swr'
import { GetCocktailDraftByIDResponse } from 'sdk'
import { DraftService } from 'lib/application/ports'
import { CocktailPostDraft, FetchResponse } from 'lib/domain/cocktail'

const useDraftService = (
  id: number | undefined,
  token: string | null
): DraftService => {
  const getKey = () => {
    if (!token || !id) return null
    const path = `/cocktail-drafts/${id}`
    return [path, token]
  }

  const {
    data: resData,
    error,
    mutate,
    isValidating
  } = useSWR<GetCocktailDraftByIDResponse>(getKey, { revalidateOnFocus: false })

  const getById = () => {
    let data: CocktailPostDraft | undefined = undefined
    if (resData) {
      data = {
        id: resData.cocktail_id,
        title: resData.title,
        description: resData.description,
        photos: resData.photos.map(p => ({
          id: p.id,
          path: p.path
        })),
        ingredients: resData.ingredient_list.map(i => ({
          name: i.name,
          amount: i.amount
        })),
        steps: resData.step_list.map(s => ({ description: s.description }))
      }
    }

    const fetchResponse: FetchResponse<CocktailPostDraft> = {
      data,
      error,
      mutate,
      isValidating
    }
    return fetchResponse
  }

  return { getById }
}

export default useDraftService
