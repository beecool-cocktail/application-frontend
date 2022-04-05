import { GetCocktailDraftByIDResponse, UpdateDraftArticleRequest } from 'sdk'
import { DraftService } from 'lib/application/ports'
import { CocktailPostDraft, FetchResponse } from 'lib/domain/cocktail'
import useCornerSWR from '../hooks/useCornerSWR'
import { cocktailApi } from './api'

const useDraftService = (id: number): DraftService => {
  const { data: resData, error } = useCornerSWR<GetCocktailDraftByIDResponse>(
    id ? `/cocktail-drafts/${id}` : null,
    { auth: true }
  )

  const getById = () => {
    let data: CocktailPostDraft | undefined = undefined
    if (resData) {
      data = {
        id: resData.cocktail_id || 0,
        title: resData.title || '',
        description: resData.description || '',
        photos:
          resData.photos?.map(p => ({
            id: p.id || 0,
            path: p.path || ''
          })) || [],
        ingredients:
          resData.ingredient_list?.map(i => ({
            name: i.name || '',
            amount: i.amount || ''
          })) || [],
        steps:
          resData.step_list?.map(s => ({ description: s.description || '' })) ||
          []
      }
    }

    const fetchResponse: FetchResponse<CocktailPostDraft> = {
      data,
      error
    }
    return fetchResponse
  }

  const update = async (draft: CocktailPostDraft) => {
    const req: UpdateDraftArticleRequest = {
      name: draft.title,
      description: draft.description,
      photos: draft.photos.map(p => ({ id: p.id, path: p.path })),
      ingredient_list: draft.ingredients,
      step_list: draft.steps
    }
    await cocktailApi.updateCocktailDraft(id, req)
  }

  const toFormal = async () => {
    await cocktailApi.makeCocktailDraftToFormal(id)
  }

  return { getById, update, toFormal }
}

export default useDraftService
