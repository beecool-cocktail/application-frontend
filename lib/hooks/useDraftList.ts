import { CocktailDraftList, CocktailPostDraft } from 'lib/types/cocktail'
import useCornerSWR from './useCornerSWR'

const useDraftList = () => {
  const { data, error } = useCornerSWR<CocktailDraftList>('/cocktail-drafts', {
    auth: true
  })

  const setDrafts = (handler: (drafts: CocktailPostDraft[]) => void) => {
    console.warn(handler)
  }

  return {
    drafts: data?.draft_cocktail_list,
    error,
    loading: !data && !error,
    setDrafts
  }
}

export default useDraftList
