import produce from 'immer'
import useSWR, { MutatorOptions } from 'swr'
import favoriteCocktailService from 'lib/services/favoriteCocktailAdapter'
import { FALLBACK_URL } from 'lib/constants/image'
import { CocktailPost, collectCocktail } from 'lib/domain/cocktail'
import cocktailService from 'lib/services/cocktailAdapter'
import useUser from 'lib/application/user/useUser'
import { paths } from 'lib/configs/routes'
import snackbarMessages from 'lib/constants/snackbarMessages'
import useLoginAction from 'lib/application/ui/useLoginAction'
import useConfig from '../useConfig'
import useLoginDialog from '../ui/useLoginDialog'
import useCornerRouter from '../useCornerRouter'
import useErrorHandler from '../useErrorHandler'
import useAuth from '../auth/useAuth'

const FETCH_KEY = 'COCKTAIL'

const useCocktail = (id?: number) => {
  const store = useLoginAction(state => ({
    collectAfterLogin: state.collectAfterLogin,
    setCollectAfterLogin: state.setCollectAfterLogin
  }))
  const { handleError } = useErrorHandler()
  const { token } = useAuth()
  const router = useCornerRouter()
  const loginDialog = useLoginDialog()
  const { config, loading: configLoading, toAbsolutePath } = useConfig()
  const { user } = useUser()
  const { data, error, mutate } = useSWR(
    () => {
      if (!id) return null
      return [id, token, FETCH_KEY]
    },
    cocktailService.getById,
    { revalidateOnFocus: false }
  )

  const collect = async () => {
    if (!id) return
    if (!token)
      return loginDialog.open({
        collectAfterLogin: true,
        redirectPath: router.asPath
      })

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

  let cocktail = data
  if (cocktail && config) {
    if (token && store.collectAfterLogin) {
      store.setCollectAfterLogin(false)
      if (!cocktail.isCollected) collect()
    }
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
