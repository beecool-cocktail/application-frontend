import { GetCocktailDraftByIDResponse } from 'sdk'
import { DraftService } from 'lib/application/ports'
import { CocktailPostDraft, FetchResponse } from 'lib/domain/cocktail'
import useCornerSWR from '../hooks/useCornerSWR'

const useDraftService = (id: number): DraftService => {
  const {
    data: resData,
    error,
    mutate,
    isValidating
  } = useCornerSWR<GetCocktailDraftByIDResponse>(
    id ? `/cocktail-drafts/${id}` : null,
    { auth: true }
  )

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
