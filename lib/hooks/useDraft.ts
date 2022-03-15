import useCornerSWR from 'lib/hooks/useCornerSWR'
import { CocktailPostDraft } from 'lib/types/cocktail'

const useDrafts = () => {
  const { data, error } = useCornerSWR<CocktailPostDraft[]>('/drafts', {
    auth: false
  })
  const setDrafts = (handler: (drafts: CocktailPostDraft[]) => void) => {
    console.warn(handler)
  }
  return { drafts: data, error, loading: false, setDrafts }
}

export default useDrafts
