import produce from 'immer'
import { join } from 'lib/helper/url'
import useCocktailService from 'lib/services/cocktailAdapter'
import useFavoriteCocktailUpdateService from 'lib/services/favoriteCocktailUpdateAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useConfig from './useConfig'
import useLoginDialog from './useLoginDialog'
import useSnackbar from './useSnackbar'

const useCocktail = (id: number | undefined) => {
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const loginDialog = useLoginDialog()
  const { config, loading: configLoading } = useConfig()
  const { getById } = useCocktailService(id)
  const favoriteCocktailUpdateService = useFavoriteCocktailUpdateService()
  const result = getById()
  const error = result.error
  let cocktail = result.data

  if (cocktail && config) {
    cocktail = produce(cocktail, draft => {
      draft.photos = draft.photos.map(p => ({
        ...p,
        path: join(config.staticBaseUrl, p.path)
      }))
    })
  } else {
    cocktail = undefined
  }

  const collect = async () => {
    const token = storage.getToken()
    if (!id || !cocktail) return
    if (!token) return loginDialog.setOpen(true)
    if (cocktail.isCollected) {
      await favoriteCocktailUpdateService.remove(id, token)
      snackbar.success('remove success')
    } else {
      await favoriteCocktailUpdateService.collect(id, token)
      snackbar.success('collect success')
    }
    result.mutate()
  }

  return {
    cocktail,
    collect,
    loading: (!cocktail && !error) || configLoading,
    error
  }
}

export default useCocktail
