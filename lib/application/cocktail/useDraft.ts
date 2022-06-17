import useSWR from 'swr'
import draftService from 'lib/services/draftAdapter'
import { join } from 'lib/helper/url'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useConfig from '../useConfig'

const useDraft = (id: number) => {
  const storage = useLocalStorage()
  const { config, loading: configLoading } = useConfig()
  const { data, error, isValidating } = useSWR(
    () => {
      const token = storage.getToken()
      if (!token) return null
      return [id, token]
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
