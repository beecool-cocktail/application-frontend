import produce from 'immer'
import useSWR, { MutatorOptions } from 'swr'
import favoriteCocktailService from 'lib/services/favoriteCocktailAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import { FALLBACK_URL } from 'lib/constants/image'
import { CocktailPost, collectCocktail } from 'lib/domain/cocktail'
import cocktailService from 'lib/services/cocktailAdapter'
import useUser from 'lib/application/user/useUser'
import { paths } from 'lib/configs/routes'
import snackbarMessages from 'lib/constants/snackbarMessages'
import useConfig from '../useConfig'
import useLoginDialog from '../ui/useLoginDialog'
import useCornerRouter from '../useCornerRouter'
import useErrorHandler from '../useErrorHandler'

const FETCH_KEY = 'COCKTAIL'

const useCocktail = (id?: number) => {
  const { handleError } = useErrorHandler()
  const storage = useLocalStorage()
  const router = useCornerRouter()
  const loginDialog = useLoginDialog()
  const { config, loading: configLoading, toAbsolutePath } = useConfig()
  const { user } = useUser()
  const { data, error, mutate } = useSWR(
    () => {
      if (!id) return null
      const token = storage.getToken()
      return [id, token, FETCH_KEY]
    },
    cocktailService.getById,
    { revalidateOnFocus: false }
  )

  let cocktail = data
  if (cocktail && config) {
    cocktail = produce(cocktail, draft => {
      draft.photos = draft.photos.map(p => ({
        ...p,
        path: toAbsolutePath(p.path)
      }))
      if (draft.userPhoto) draft.userPhoto = toAbsolutePath(draft.userPhoto)
      else draft.userPhoto = FALLBACK_URL
    })
  } else {
    cocktail = undefined
  }

  const collect = async () => {
    if (!id) return

    const token = storage.getToken()
    if (!token) return loginDialog.setOpen(true)

    const mutateOpts: MutatorOptions<CocktailPost> = {
      rollbackOnError: true,
      optimisticData: currentData => {
        if (!currentData) return currentData as unknown as CocktailPost
        return collectCocktail(currentData)
      }
    }

    let snackbarMessage = snackbarMessages.collectFavorite
    try {
      await mutate(async optimisticData => {
        if (!optimisticData) return
        if (optimisticData.isCollected) {
          snackbarMessage = snackbarMessages.collectFavorite
          await favoriteCocktailService.collect(id, token)
        } else {
          snackbarMessage = snackbarMessages.removeFavorite
          await favoriteCocktailService.remove(id, token)
        }
        return optimisticData
      }, mutateOpts)
    } catch (error) {
      handleError(error, { snackbarMessage: snackbarMessage.error })
    }
  }

  const handleEdit = () => {
    if (!cocktail) return
    router.push(paths.editPost(cocktail.id))
  }

  return {
    cocktail,
    collect,
    loading: (!cocktail && !error) || configLoading,
    error,
    editable: user && cocktail && user.id === cocktail.userId,
    handleEdit
  }
}

export default useCocktail
