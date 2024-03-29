import produce from 'immer'
import useSWR from 'swr'
import myCocktailService from 'lib/services/myCocktailListAdapter'
import useSnackbar from 'lib/application/hooks/ui/useSnackbar'
import useConfig from 'lib/application/hooks/useConfig'
import { join } from 'lib/utils/url'
import { FALLBACK_URL } from 'lib/application/constants/image'
import { MyCocktailItem, ProfileCocktailItem } from 'lib/domain/cocktail'
import { paths } from 'lib/application/configs/routes'
import favoriteCocktailService from 'lib/services/favoriteCocktailAdapter'
import snackbarMessages from 'lib/application/constants/snackbarMessages'
import dialogMessages from 'lib/application/constants/dialogMessages'
import useUser from '../user/useUser'
import useConfirmDialog from '../ui/useConfirmDialog'
import useLoginDialog from '../ui/useLoginDialog'
import useCornerRouter from '../useCornerRouter'
import useShare from '../ui/useShare'
import useErrorHandler from '../useErrorHandler'
import useAuth from '../auth/useAuth'

const FETCH_KEY = Symbol('MY_COCKTAIL')

const useMyCocktailList = (userId?: number) => {
  const { mutate: userMutate } = useUser(userId)
  const { token } = useAuth()
  const share = useShare()
  const router = useCornerRouter()
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const loginDialog = useLoginDialog()
  const { handleError } = useErrorHandler()
  const { config, loading: configLoading } = useConfig()
  const { data, error, mutate } = useSWR(
    () => {
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
    if (!token) {
      loginDialog.open({
        collectAfterLogin: true,
        redirectPath: `/cocktails/${cocktail.id}`
      })
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
