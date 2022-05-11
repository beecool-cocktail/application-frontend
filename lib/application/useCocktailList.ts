import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import produce from 'immer'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import useCocktailListService from 'lib/services/cocktailListAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import { CocktailPostItem } from 'lib/domain/cocktail'
import useFavoriteCocktailUpdateService from 'lib/services/favoriteCocktailUpdateAdapter'
import { PhotoWithBlur } from 'lib/domain/photo'
import useConfig from './useConfig'
import useSnackbar from './useSnackbar'
import useLoginDialog from './useLoginDialog'

const useCocktailList = () => {
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const loginDialog = useLoginDialog()
  const { config, loading: configLoading } = useConfig()
  const { getList } = useCocktailListService(storage.getToken())
  const favoriteCocktailUpdateService = useFavoriteCocktailUpdateService()
  const { ref: bottomRef, inView } = useInView()

  const result = getList()
  const {
    data,
    error,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    loadMore,
    mutate
  } = result

  let cocktails: CocktailPostItem[] | undefined = data
    ? data.flatMap(c => c)
    : []
  if (cocktails && config) {
    cocktails = cocktails.map(cocktail =>
      produce(cocktail, draft => {
        const getAbsoluteUrl = (photo: PhotoWithBlur): PhotoWithBlur => ({
          id: photo.id,
          path: join(config.staticBaseUrl, photo.path),
          blurPath: join(config.staticBaseUrl, photo.blurPath)
        })
        draft.photos = draft.photos.length
          ? draft.photos.map(getAbsoluteUrl)
          : [{ path: FALLBACK_URL, blurPath: '' }]
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
    mutate()
  }

  useEffect(() => {
    if (
      inView &&
      !error &&
      !isLoadingMore &&
      !isLoadingInitialData &&
      !isReachingEnd &&
      !isRefreshing
    ) {
      loadMore()
    }
  }, [
    error,
    inView,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    loadMore
  ])

  return {
    ...result,
    bottomRef,
    cocktails,
    loading: isLoadingInitialData || configLoading,
    collect
  }
}

export default useCocktailList
