import produce from 'immer'
import useMyCocktailListService from 'lib/services/myCocktailListAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useSnackbar from 'lib/application/useSnackbar'
import useConfig from 'lib/application/useConfig'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import { FavoriteCocktailItem } from 'lib/domain/cocktail'

const useMyCocktailList = () => {
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const { config, loading: configLoading } = useConfig()
  const myCocktailListService = useMyCocktailListService(storage.getToken())
  const result = myCocktailListService.getList()

  let cocktails: FavoriteCocktailItem[] | undefined
  if (result.data && config) {
    cocktails = result.data.map(cocktail =>
      produce(cocktail, draft => {
        draft.photoUrl = draft.photoUrl
          ? join(config.staticBaseUrl, draft.photoUrl)
          : FALLBACK_URL
      })
    )
  }

  const deleteById = async (id: number) => {
    const token = storage.getToken()
    if (!token) return
    await myCocktailListService.deleteById(id, token)
    result.mutate()
    snackbar.success('remove success')
  }

  return {
    ...result,
    data: cocktails,
    loading: (result.data && result.error) || configLoading,
    deleteById
  }
}

export default useMyCocktailList
