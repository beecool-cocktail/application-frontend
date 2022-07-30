import produce from 'immer'
import useSWR from 'swr'
import myCocktailService from 'lib/services/myCocktailListAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useSnackbar from 'lib/application/ui/useSnackbar'
import useConfig from 'lib/application/useConfig'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import { ProfileCocktailItem } from 'lib/domain/cocktail'
import { paths } from 'lib/configs/routes'
import commandService from 'lib/services/commandAdapter'
import favoriteCocktailService from 'lib/services/favoriteCocktailAdapter'
import useUser from '../user/useUser'
import useConfirmDialog from '../ui/useConfirmDialog'
import useCornerRouter from '../useCornerRouter'
import useShare from '../ui/useShare'
const FETCH_KEY = Symbol('MY_COCKTAIL')

const useMyCocktailList = (userId?: number) => {
  const { mutate: userMutate } = useUser(userId)
  const storage = useLocalStorage()
  const share = useShare()
  const router = useCornerRouter()
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const { config, loading: configLoading } = useConfig()
  const { data, error, mutate } = useSWR(
    () => {
      const token = storage.getToken()
      if (!token) return null
      if (userId) return [userId, token, FETCH_KEY]
      return [token, FETCH_KEY]
    },
    userId ? myCocktailService.getOtherList : myCocktailService.getSelfList
  )

  let cocktails: ProfileCocktailItem[] | undefined
  if (data && config) {
    cocktails = data.map(cocktail =>
      produce(cocktail, draft => {
        draft.photoUrl = draft.photoUrl
          ? join(config.staticBaseUrl, draft.photoUrl)
          : FALLBACK_URL
      })
    )
  }

  const handleDeleteConfirm = (id: number) => async () => {
    const token = storage.getToken()
    if (!token) return
    await myCocktailService.deleteById(id, token)
    mutate()
    userMutate()
    snackbar.success('remove success')
    confirmDialog.destroy()
  }

  const deleteCocktail = async (cocktail: ProfileCocktailItem) => {
    confirmDialog.open({
      title: '刪除發文',
      content: '確定刪除此發文，一旦刪除將無法復原？',
      onConfirm: handleDeleteConfirm(cocktail.id),
      onCancel: () => confirmDialog.destroy()
    })
  }

  const removeCocktail = async (cocktail: ProfileCocktailItem) => {
    const token = storage.getToken()
    if (!token) return

    const commandId = await favoriteCocktailService.remove(cocktail.id, token)
    mutate()
    userMutate()
    snackbar.success('remove success', 5000, async () => {
      await commandService.undoCommand(commandId, token)
      mutate()
      userMutate()
    })
    confirmDialog.destroy()
  }

  const shareCocktail = (cocktail: ProfileCocktailItem) =>
    share(
      cocktail.title,
      new URL(`/cocktails/${cocktail.id}`, window.location.origin).href
    )

  const gotoEditPage = (cocktail: ProfileCocktailItem) =>
    router.push(paths.editPost(cocktail.id))
  const gotoCocktailPage = (id: number) => router.push(paths.cocktailById(id))

  const isVisitor = userId != null
  const cardActions = isVisitor
    ? [
        { text: '分享貼文', onClick: shareCocktail },
        { text: '移除收藏', onClick: removeCocktail }
      ]
    : [
        { text: '刪除貼文', onClick: deleteCocktail },
        { text: '編輯貼文', onClick: gotoEditPage }
      ]

  return {
    cardActions,
    data: cocktails,
    loading: (data && error) || configLoading,
    error,
    gotoCocktailPage
  }
}

export default useMyCocktailList
