import produce from 'immer'
import useFavoriteCocktailListService from 'lib/services/favoriteCocktailListAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useSnackbar from 'lib/application/ui/useSnackbar'
import useConfig from 'lib/application/useConfig'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import { FavoriteCocktailList } from 'lib/domain/cocktail'

const useFavoriteCocktailList = (userId?: number) => {
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const { config, loading: configLoading } = useConfig()
  const favoriteCocktailListService = useFavoriteCocktailListService(
    storage.getToken(),
    userId
  )
  const result = favoriteCocktailListService.getList()

  let cocktailList: FavoriteCocktailList | undefined
  if (result.data && config) {
    cocktailList = {
      isPublic: result.data.isPublic,
      data: result.data.data.map(cocktail =>
        produce(cocktail, draft => {
          draft.photoUrl = draft.photoUrl
            ? join(config.staticBaseUrl, draft.photoUrl)
            : FALLBACK_URL
        })
      )
    }
  }

  const remove = async (id: number) => {
    const token = storage.getToken()
    if (!token) return
    await favoriteCocktailListService.remove(id, token)
    result.mutate()
    snackbar.success('remove success')
  }

  return {
    ...result,
    data: cocktailList,
    loading: (result.data && result.error) || configLoading,
    remove
  }
}

export default useFavoriteCocktailList
