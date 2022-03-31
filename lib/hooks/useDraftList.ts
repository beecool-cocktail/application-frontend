import produce from 'immer'
import { CocktailDraftList, CocktailPostDraft } from 'lib/types/cocktail'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import useCornerSWR from './useCornerSWR'
import useConfig from './useConfig'

const useDraftList = () => {
  const { config, loading: configLoading } = useConfig()
  const { data, error } = useCornerSWR<CocktailDraftList>('/cocktail-drafts', {
    auth: true
  })

  const setDrafts = (handler: (drafts: CocktailPostDraft[]) => void) => {
    console.warn(handler)
  }

  let response = data
  if (response && config) {
    response = produce(response, base => {
      base.draft_cocktail_list = base.draft_cocktail_list.map(d => ({
        ...d,
        title: d.title || 'Untitled',
        photo: d.photo ? join(config.staticBaseUrl, d.photo) : FALLBACK_URL
      }))
    })
  }

  return {
    drafts: response?.draft_cocktail_list,
    error,
    loading: (!data && !error) || configLoading,
    setDrafts
  }
}

export default useDraftList
