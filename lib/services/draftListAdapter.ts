import useSWR from 'swr'
import { GetDraftCocktailListResponse } from 'sdk'
import { DraftListService } from 'lib/application/ports'
import { CocktailPostDraftList, FetchResponse } from 'lib/domain/cocktail'
import { cocktailApi } from './api'

const useDraftList = (token: string | null): DraftListService => {
  const getKey = () => {
    if (!token) return null
    const path = '/cocktail-drafts'
    return [path, token]
  }

  const {
    data: resData,
    error,
    isValidating,
    mutate
  } = useSWR<GetDraftCocktailListResponse>(getKey)

  const getList = () => {
    let data: CocktailPostDraftList | undefined = undefined
    if (resData) {
      data = {
        totalCount: resData.total,
        data: resData.draft_cocktail_list.map(item => ({
          id: item.cocktail_id,
          title: item.title,
          coverPhotoUrl: item.photo
        }))
      }
    }

    const fetchResponse: FetchResponse<CocktailPostDraftList> = {
      data,
      error,
      isValidating,
      mutate
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
