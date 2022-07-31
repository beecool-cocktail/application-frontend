import produce from 'immer'
import useSWR from 'swr'
import favoriteCocktailService from 'lib/services/favoriteCocktailAdapter'
import commandService from 'lib/services/commandAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useSnackbar from 'lib/application/ui/useSnackbar'
import useConfig from 'lib/application/useConfig'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import { FavoriteCocktailList, ProfileCocktailItem } from 'lib/domain/cocktail'
import { DEFAULT_CONFIG } from 'lib/configs/snackbar'
import { paths } from 'lib/configs/routes'
import useUser from '../user/useUser'
import useCornerRouter from '../useCornerRouter'
import useShare from '../ui/useShare'
import useConfirmDialog from '../ui/useConfirmDialog'

const FETCH_KEY = 'FAVORITE_COCKTAIL_LIST'

const useFavoriteCocktailList = (userId?: number) => {
  const storage = useLocalStorage()
  const share = useShare()
  const router = useCornerRouter()
  const confirmDialog = useConfirmDialog()
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

  const isVisitor = userId != null

  const collectCocktail = async (cocktail: ProfileCocktailItem) => {
    const token = storage.getToken()
    if (!token) return

    await favoriteCocktailService.collect(cocktail.id, token)
    mutate()
    if (!isVisitor) userMutate()
    snackbar.success('collect success')
  }

  const removeCocktail = async (cocktail: ProfileCocktailItem) => {
    const token = storage.getToken()
    if (!token) return

    const commandId = await favoriteCocktailService.remove(cocktail.id, token)
    mutate()
    if (!isVisitor) userMutate()
    snackbar.success(
      'remove success',
      DEFAULT_CONFIG.undoDuration,
      async () => {
        await commandService.undoCommand(commandId, token)
        mutate()
        if (!isVisitor) userMutate()
      }
    )
    confirmDialog.destroy()
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
