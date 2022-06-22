import produce from 'immer'
import useSWR from 'swr'
import favoriteCocktailService from 'lib/services/favoriteCocktailAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useSnackbar from 'lib/application/ui/useSnackbar'
import useConfig from 'lib/application/useConfig'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import { FavoriteCocktailList } from 'lib/domain/cocktail'
import useUser from '../user/useUser'

const FETCH_KEY = 'FAVORITE_COCKTAIL_LIST'

const useFavoriteCocktailList = (userId?: number) => {
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const { config, loading: configLoading } = useConfig()
  const { data, error, mutate } = useSWR(
    () => {
      if (userId) return [userId, FETCH_KEY]
      return [storage.getToken(), FETCH_KEY]
    },
    userId
      ? favoriteCocktailService.getOtherList
      : favoriteCocktailService.getSelfList
  )
  const { mutate: userMutate } = useUser(userId)

  let cocktailList: FavoriteCocktailList | undefined
  if (data && config) {
    cocktailList = {
      isPublic: data.isPublic,
      data: data.data.map(cocktail =>
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
    await favoriteCocktailService.remove(id, token)
    mutate()
    userMutate()
    snackbar.success('remove success')
  }

  return {
    data: cocktailList,
    loading: (data && error) || configLoading,
    error,
    remove
  }
}

export default useFavoriteCocktailList
