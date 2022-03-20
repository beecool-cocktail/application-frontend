import useCornerSWR from 'lib/hooks/useCornerSWR'
import { CocktailPostDraft } from 'lib/types/cocktail'

const useDraft = (id: string) => {
  const { data, error } = useCornerSWR<CocktailPostDraft>(
    id ? `/cocktail-drafts/${id}` : null,
    { auth: true }
  )
  return { draft: data, error, loading: !data && !error }
}

export default useDraft
