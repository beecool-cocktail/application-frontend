import { join } from 'lib/helper/url'
import useCornerSWR from 'lib/hooks/useCornerSWR'
import { CocktailPostDraft } from 'lib/types/cocktail'
import useConfig from './useConfig'

const useDraft = (id: string) => {
  const { config, loading: configLoading } = useConfig()
  const { data, error } = useCornerSWR<CocktailPostDraft>(
    id ? `/cocktail-drafts/${id}` : null,
    { auth: true }
  )

  let draft = data
  if (draft && config) {
    draft = {
      ...draft,
      photos: draft.photos.map(p => ({
        ...p,
        path: join(config.staticBaseUrl, p.path)
      }))
    }
  } else {
    draft = undefined
  }

  return { draft, error, loading: (!data && !error) || configLoading }
}

export default useDraft
