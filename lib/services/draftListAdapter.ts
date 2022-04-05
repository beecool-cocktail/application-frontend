import { GetDraftCocktailListResponse } from 'sdk'
import { DraftListService } from 'lib/application/ports'
import { CocktailPostDraftList, FetchResponse } from 'lib/domain/cocktail'
import useCornerSWR from '../hooks/useCornerSWR'
import { cocktailApi } from './api'

const useDraftList = (): DraftListService => {
  const { data: resData, error } = useCornerSWR<GetDraftCocktailListResponse>(
    '/cocktail-drafts',
    { auth: true }
  )

  const getList = () => {
    let data: CocktailPostDraftList | undefined = undefined
    if (resData) {
      data = {
        totalCount: resData.total || 0,
        data:
          resData.draft_cocktail_list?.map(item => ({
            id: item.cocktail_id || 0,
            title: item.title || '',
            coverPhotoUrl: item.photo || ''
          })) || []
      }
    }

    const fetchResponse: FetchResponse<CocktailPostDraftList> = {
      data,
      error
    }
    return fetchResponse
  }

  const deleteByIds = async (ids: number[], token: string) => {
    await cocktailApi.deleteDraftArticleRequest(
      { deleted_ids: ids },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  }

  return { getList, deleteByIds }
}

export default useDraftList
