import useDraftService from 'lib/services/draftAdapter'
import { join } from 'lib/helper/url'
import useConfig from './useConfig'

const useDraft = (id: number) => {
  const { config, loading: configLoading } = useConfig()
  const { getById } = useDraftService(id)

  const getByIdResult = getById()
  let draft = getByIdResult.data
  const { isValidating, error } = getByIdResult
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
