import produce from 'immer'
import useSWR, { MutatorOptions } from 'swr'
import favoriteCocktailService from 'lib/services/favoriteCocktailAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import { FALLBACK_URL } from 'lib/constants/image'
import { CocktailPost, collectCocktail } from 'lib/domain/cocktail'
import cocktailService from 'lib/services/cocktailAdapter'
import useUser from 'lib/application/user/useUser'
import { paths } from 'lib/configs/routes'
import useConfig from '../useConfig'
import useLoginDialog from '../ui/useLoginDialog'
import useSnackbar from '../ui/useSnackbar'
import useCornerRouter from '../useCornerRouter'

const FETCH_KEY = 'COCKTAIL'

const useCocktail = (id?: number) => {
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
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

    try {
      await mutate(async optimisticData => {
        if (!optimisticData) return
        if (optimisticData.isCollected) {
          await favoriteCocktailService.collect(id, token)
          snackbar.success('collect success')
        } else {
          await favoriteCocktailService.remove(id, token)
          snackbar.success('remove success')
        }
        return optimisticData
      }, mutateOpts)
    } catch (e) {
      if (e instanceof Error) snackbar.error(e.message)
    }
  }

  const handleEdit = () => {
    if (!cocktail) return
    router.push(paths.editPost(cocktail.id, true))
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
