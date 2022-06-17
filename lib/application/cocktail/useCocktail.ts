import produce from 'immer'
import useSWR, { MutatorOptions } from 'swr'
import favoriteCocktailService from 'lib/services/favoriteCocktailAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import { FALLBACK_URL } from 'lib/constants/image'
import { CocktailPost, collectCocktail } from 'lib/domain/cocktail'
import cocktailService from 'lib/services/cocktailAdapter'
import useConfig from '../useConfig'
import useLoginDialog from '../useLoginDialog'
import useSnackbar from '../ui/useSnackbar'

const useCocktail = (id?: number) => {
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const loginDialog = useLoginDialog()
  const { config, loading: configLoading, toAbsolutePath } = useConfig()
  const { data, error, mutate } = useSWR(
    () => {
      if (!id) return null
      const token = storage.getToken()
      if (!token) return id
      return [id, token]
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

  return {
    cocktail,
    collect,
    loading: (!cocktail && !error) || configLoading,
    error
  }
}

export default useCocktail
