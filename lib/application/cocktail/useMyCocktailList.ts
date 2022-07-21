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
import useUser from '../user/useUser'
import useConfirmDialog from '../ui/useConfirmDialog'
import useCornerRouter from '../useCornerRouter'

const FETCH_KEY = Symbol('MY_COCKTAIL')

const useMyCocktailList = (userId?: number) => {
  const { mutate: userMutate } = useUser(userId)
  const storage = useLocalStorage()
  const router = useCornerRouter()
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const { config, loading: configLoading } = useConfig()
  const { data, error, mutate } = useSWR(
    () => {
      if (userId) return [userId, FETCH_KEY]
      return [storage.getToken(), FETCH_KEY]
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

  const gotoEditPage = (cocktail: ProfileCocktailItem) =>
    router.push(paths.editPost(cocktail.id))
  const gotoCocktailPage = (id: number) => router.push(paths.cocktailById(id))

  return {
    data: cocktails,
    loading: (data && error) || configLoading,
    error,
    gotoCocktailPage,
    gotoEditPage,
    deleteCocktail
  }
}

export default useMyCocktailList
