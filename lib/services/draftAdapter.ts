import { DraftService } from 'lib/application/ports'
import { CocktailPostDraft, CocktailPostDraftList } from 'lib/domain/cocktail'
import { cocktailApi } from './api'

const getList = async (token: string): Promise<CocktailPostDraftList> => {
  const res = await cocktailApi.getCocktailDraft({
    headers: { Authorization: `Bearer ${token}` }
  })
  const resData = res.data.data

  return {
    totalCount: resData.total,
    data: resData.draft_cocktail_list.map(item => ({
      id: item.cocktail_id,
      description: item.description,
      title: item.title,
      coverPhotoUrl: item.photo
    }))
  }
}

const getById = async (
  draftId: number,
  token: string
): Promise<CocktailPostDraft> => {
  const res = await cocktailApi.getCocktailByIDRequest(draftId, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const resData = res.data.data

  return {
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

const deleteByIds = async (ids: number[], token: string) => {
  await cocktailApi.deleteDraftArticleRequest(
    { deleted_ids: ids },
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

const draftService: DraftService = {
  getList,
  getById,
  deleteByIds
}

export default draftService
