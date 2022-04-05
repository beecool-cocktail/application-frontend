import useDraftService from 'lib/services/draftAdapter'
import { join } from 'lib/helper/url'
import useConfig from 'lib/hooks/useConfig'

const useDraft = (id: number) => {
  const { config, loading: configLoading } = useConfig()
  const { getById, update, toFormal } = useDraftService(id)

  const getByIdResult = getById()
  let draft = getByIdResult.data
  const error = getByIdResult.error
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
    update,
    toFormal
  }
}

export default useDraft
