import produce from 'immer'
import useSWR from 'swr'
import myCocktailService from 'lib/services/myCocktailListAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useSnackbar from 'lib/application/ui/useSnackbar'
import useConfig from 'lib/application/useConfig'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import { MyCocktailItem } from 'lib/domain/cocktail'
import useUser from '../user/useUser'

const FETCH_KEY = Symbol('MY_COCKTAIL')

const useMyCocktailList = (userId?: number) => {
  const { mutate: userMutate } = useUser(userId)
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const { config, loading: configLoading } = useConfig()
  const { data, error, mutate } = useSWR(
    () => {
      if (userId) return [userId, FETCH_KEY]
      return [storage.getToken(), FETCH_KEY]
    },
    userId ? myCocktailService.getOtherList : myCocktailService.getSelfList
  )

  let cocktails: MyCocktailItem[] | undefined
  if (data && config) {
    cocktails = data.map(cocktail =>
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
    await myCocktailService.deleteById(id, token)
    mutate()
    userMutate()
    snackbar.success('remove success')
  }

  return {
    data: cocktails,
    loading: (data && error) || configLoading,
    error,
    deleteById
  }
}

export default useMyCocktailList
