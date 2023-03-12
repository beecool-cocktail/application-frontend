import produce from 'immer'
import useSWR from 'swr'
import myCocktailService from 'lib/services/myCocktailListAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useSnackbar from 'lib/application/ui/useSnackbar'
import useConfig from 'lib/application/useConfig'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import { MyCocktailItem, ProfileCocktailItem } from 'lib/domain/cocktail'
import { paths } from 'lib/configs/routes'
import favoriteCocktailService from 'lib/services/favoriteCocktailAdapter'
import snackbarMessages from 'lib/constants/snackbarMessages'
import dialogMessages from 'lib/constants/dialogMessages'
import useUser from '../user/useUser'
import useConfirmDialog from '../ui/useConfirmDialog'
import useLoginDialog from '../ui/useLoginDialog'
import useCornerRouter from '../useCornerRouter'
import useShare from '../ui/useShare'
import useErrorHandler from '../useErrorHandler'

const FETCH_KEY = Symbol('MY_COCKTAIL')

const useMyCocktailList = (userId?: number) => {
  const { mutate: userMutate } = useUser(userId)
  const storage = useLocalStorage()
  const share = useShare()
  const router = useCornerRouter()
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const loginDialog = useLoginDialog()
  const { handleError } = useErrorHandler()
  const { config, loading: configLoading } = useConfig()
  const { data, error, mutate } = useSWR(
    () => {
      const token = storage.getToken()
      if (userId) return [userId, token, FETCH_KEY]
      if (!token) return null
      return [token, FETCH_KEY]
    },
    userId ? myCocktailService.getOtherList : myCocktailService.getSelfList
  )

  let cocktails: MyCocktailItem[] | undefined
  if (data && config) {
    const compareCreatedDate = (a: MyCocktailItem, b: MyCocktailItem) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()

    cocktails = data
      .map(cocktail =>
        produce(cocktail, draft => {
          draft.photoUrl = draft.photoUrl
            ? join(config.staticBaseUrl, draft.photoUrl)
            : FALLBACK_URL
        })
      )
      .sort(compareCreatedDate)
  }

  const isVisitor = userId != null

  const handleDeleteConfirm = (id: number) => async () => {
    const token = storage.getToken()
    if (!token) return

    try {
      await myCocktailService.deleteById(id, token)
      mutate()
      userMutate()
      confirmDialog.destroy()
    } catch (error) {
      handleError(error, { snackbarMessage: snackbarMessages.deletePost.error })
    } finally {
      confirmDialog.destroy()
    }
  }

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

  const deleteCocktail = async (cocktail: ProfileCocktailItem) => {
    confirmDialog.open({
      ...dialogMessages.deletePost,
      onConfirm: handleDeleteConfirm(cocktail.id),
      onCancel: () => confirmDialog.destroy()
    })
  }

  const removeCocktail = async (cocktail: ProfileCocktailItem) => {
    const token = storage.getToken()
    if (!token) return

    try {
      await favoriteCocktailService.remove(cocktail.id, token)
      mutate()
      if (!isVisitor) userMutate()
      snackbar.success(snackbarMessages.removeFavorite.success)
    } catch (error) {
      handleError(error, {
        snackbarMessage: snackbarMessages.removeFavorite.error
      })
    }
  }

  const shareCocktail = (cocktail: ProfileCocktailItem) =>
    share(
      cocktail.title,
      new URL(`/cocktails/${cocktail.id}`, window.location.origin).href
    )

  const gotoEditPage = (cocktail: ProfileCocktailItem) =>
    router.push(paths.editPost(cocktail.id))
  const gotoCocktailPage = (id: number) => router.push(paths.cocktailById(id))

  const getCardActions = (collected = false) => {
    if (isVisitor) {
      return [
        { text: '分享貼文', onClick: shareCocktail },
        collected
          ? { text: '移除收藏', onClick: removeCocktail }
          : { text: '收藏貼文', onClick: collectCocktail }
      ]
    }
    return [
      { text: '刪除貼文', onClick: deleteCocktail },
      { text: '編輯貼文', onClick: gotoEditPage }
    ]
  }

  return {
    data: cocktails,
    loading: (data && error) || configLoading,
    error,
    getCardActions,
    gotoCocktailPage
  }
}

export default useMyCocktailList
