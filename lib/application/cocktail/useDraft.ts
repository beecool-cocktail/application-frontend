import useSWR from 'swr'
import draftService from 'lib/services/draftAdapter'
import { join } from 'lib/helper/url'
import useConfig from '../useConfig'
import useAuth from '../useAuth'

const FETCH_KEY = 'DRAFT'

const useDraft = (id?: number) => {
  const auth = useAuth()
  const { config, loading: configLoading } = useConfig()
  const { data, error, isValidating } = useSWR(
    () => {
      if (!id) return null
      if (!auth.token) return null
      return [id, auth.token, FETCH_KEY]
    },
    draftService.getById,
    { revalidateOnFocus: false }
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

  return {
    draft,
    error,
    loading: (!draft && !error) || configLoading,
    isValidating
  }
}

export default useDraft
