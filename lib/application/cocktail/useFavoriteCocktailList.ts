import produce from 'immer'
import useSWR from 'swr'
import favoriteCocktailService from 'lib/services/favoriteCocktailAdapter'
import commandService from 'lib/services/commandAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useSnackbar from 'lib/application/ui/useSnackbar'
import useConfig from 'lib/application/useConfig'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import {
  FavoriteCocktailList,
  FavoriteCocktailItem,
  ProfileCocktailItem
} from 'lib/domain/cocktail'
import { DEFAULT_CONFIG } from 'lib/configs/snackbar'
import { paths } from 'lib/configs/routes'
import snackbarMessages from 'lib/constants/snackbarMessages'
import useUser from '../user/useUser'
import useCornerRouter from '../useCornerRouter'
import useShare from '../ui/useShare'
import useLoginDialog from '../ui/useLoginDialog'
import useErrorHandler from '../useErrorHandler'

const FETCH_KEY = 'FAVORITE_COCKTAIL_LIST'

const useFavoriteCocktailList = (userId?: number) => {
  const storage = useLocalStorage()
  const share = useShare()
  const { handleError } = useErrorHandler()
  const router = useCornerRouter()
  const loginDialog = useLoginDialog()
  const snackbar = useSnackbar()
  const { config, loading: configLoading } = useConfig()
  const { data, error, mutate } = useSWR(
    () => {
      const token = storage.getToken()
      if (userId) return [userId, token, FETCH_KEY]
      return [token, FETCH_KEY]
    },
    userId
      ? favoriteCocktailService.getOtherList
      : favoriteCocktailService.getSelfList
  )
  const { mutate: userMutate } = useUser(userId)

  let cocktailList: FavoriteCocktailList | undefined
  if (data && config) {
    const collectedDateSorter = (
      a: FavoriteCocktailItem,
      b: FavoriteCocktailItem
    ) =>
      new Date(b.collectedDate).getTime() - new Date(a.collectedDate).getTime()

    cocktailList = {
      isPublic: data.isPublic,
      data: data.data
        .map(cocktail =>
          produce(cocktail, draft => {
            draft.photoUrl = draft.photoUrl
              ? join(config.staticBaseUrl, draft.photoUrl)
              : FALLBACK_URL
          })
        )
        .sort(collectedDateSorter)
    }
  }

  const isVisitor = userId != null

  const collectCocktail = async (cocktail: ProfileCocktailItem) => {
    const token = storage.getToken()
    if (!token) {
      loginDialog.setOpen(true)
      return
    }

    try {
      await favoriteCocktailService.collect(cocktail.id, token)
      mutate()
      if (!isVisitor) userMutate()
      snackbar.success(snackbarMessages.collectFavorite.success)
    } catch (error) {
      handleError(error, {
        snackbarMessage: snackbarMessages.collectFavorite.error
      })
    }
  }

  const removeCocktail = async (cocktail: ProfileCocktailItem) => {
    const token = storage.getToken()
    if (!token) return

    const snackbarMessage = snackbarMessages.removeFavorite
    const snackbarDuration = isVisitor
      ? DEFAULT_CONFIG.duration
      : DEFAULT_CONFIG.undoDuration
    try {
      const commandId = await favoriteCocktailService.remove(cocktail.id, token)
      mutate()
      if (!isVisitor) userMutate()

      const undoFn = isVisitor
        ? undefined
        : async () => {
            await commandService.undoCommand(commandId, token)
            mutate()
            if (!isVisitor) userMutate()
          }
      snackbar.success(
        snackbarMessage.success,
        snackbarDuration,
        undefined,
        undoFn
      )
    } catch (error) {
      handleError(error, { snackbarMessage: snackbarMessage.error })
    }
  }

  const shareCocktail = (cocktail: ProfileCocktailItem) =>
    share(
      cocktail.title,
      new URL(`/cocktails/${cocktail.id}`, window.location.origin).href
    )

  const getCardActions = (collected = false) => {
    return [
      { text: '分享貼文', onClick: shareCocktail },
      collected
        ? { text: '移除收藏', onClick: removeCocktail }
        : { text: '收藏貼文', onClick: collectCocktail }
    ]
  }

  const gotoCocktailPage = (id: number) => router.push(paths.cocktailById(id))

  return {
    data: cocktailList,
    loading: (data && error) || configLoading,
    error,
    getCardActions,
    gotoCocktailPage
  }
}

export default useFavoriteCocktailList
