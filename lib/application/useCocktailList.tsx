import produce from 'immer'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import useCocktailListService from 'lib/services/cocktailListAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import { CocktailPostItem } from 'lib/domain/cocktail'
import useFavoriteCocktailUpdateService from 'lib/services/UserFavoriteCocktailUpdateAdapter'
import useConfig from '../hooks/useConfig'
import useSnackbar from './useSnackbar'
import useLoginDialog from './useLoginDialog'

const useCocktailList = () => {
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const loginDialog = useLoginDialog()
  const { config, loading: configLoading } = useConfig()
  const { getList } = useCocktailListService(storage.getToken())
  const favoriteCocktailUpdateService = useFavoriteCocktailUpdateService()

  const result = getList()
  let cocktails: CocktailPostItem[] | undefined = result.data
    ? result.data.flatMap(c => c)
    : []
  if (cocktails && config) {
    cocktails = cocktails.map(cocktail =>
      produce(cocktail, draft => {
        const getAbsoluteUrl = (photo: string) =>
          photo ? join(config.staticBaseUrl, photo) : FALLBACK_URL
        draft.photoUrls = draft.photoUrls.map(getAbsoluteUrl)
      })
    )
  } else {
    cocktails = []
  }

  const collect = async (id: number, isCollected: boolean) => {
    const token = storage.getToken()
    if (!token) return loginDialog.setOpen(true)
    if (isCollected) {
      await favoriteCocktailUpdateService.remove(id, token)
      snackbar.success('remove success')
    } else {
      await favoriteCocktailUpdateService.collect(id, token)
      snackbar.success('collect success')
    }
    result.mutate()
  }

  return {
    ...result,
    cocktails,
    loading: result.isLoadingInitialData || configLoading,
    collect
  }
}

export default useCocktailList
