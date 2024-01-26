import { useEffect, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { useInView } from 'react-intersection-observer'
import produce from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { last } from 'ramda'
import { CocktailPostItem, collectCocktailItem } from 'lib/domain/cocktail'
import favoriteCocktailService from 'lib/services/favoriteCocktailAdapter'
import { PhotoWithBlur } from 'lib/domain/photo'
import cocktailService from 'lib/services/cocktailAdapter'
import { PAGE_SIZE } from 'lib/constants/pagination'
import useStore from 'lib/services/storeAdapter'
import snackbarMessages from 'lib/constants/snackbarMessages'
import useDebounce from 'lib/hooks/useDebounce'
import { Page } from 'lib/domain/pagination'
import useConfig from '../useConfig'
import useLoginDialog from '../ui/useLoginDialog'
import useErrorHandler from '../useErrorHandler'
import useAuth from '../useAuth'

const useCocktailList = (pageSize: number, useSearch = false) => {
  const [fetchId, setFetchId] = useState(() => uuidv4())
  const { token } = useAuth()
  const keyword = useStore(state => state.searchBarInput)
  const debouncedKeyword = useDebounce(keyword, 500)
  const loginDialog = useLoginDialog()
  const { handleError } = useErrorHandler()
  const { config, loading: configLoading, toAbsolutePath } = useConfig()

  const result = useSWRInfinite<Page<CocktailPostItem>>(
    (index, previousPageData: Page<CocktailPostItem>) => {
      if (previousPageData && !previousPageData.data.length) return null
      if (useSearch && (!keyword || !debouncedKeyword)) return null
      return [
        index + 1,
        PAGE_SIZE,
        useSearch ? debouncedKeyword : '',
        token,
        useSearch,
        fetchId
      ]
    },
    cocktailService.getList,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      onError: (error: unknown) =>
        handleError(error, { useDefaultHandler: false })
    }
  )
  const { ref: bottomRef, inView } = useInView()

  const { data: pageData, error, isValidating, size, setSize, mutate } = result

  const getTotal = (): number => {
    if (!pageData) return 0
    const lastPage = last(pageData)
    if (!lastPage) return 0
    return lastPage.total
  }

  const total = getTotal()
  const data = pageData ? pageData.map(p => p.data) : []

  const isLoadingInitialData = !pageData && !error
  const isLoadingMore =
    (isLoadingInitialData ||
      (size > 0 && data && typeof data[size - 1] === 'undefined')) &&
    !error
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize)
  const isRefreshing =
    (isValidating && data && data.length === size) || (error && isValidating)
  const resolveRef = useRef<((value: unknown) => void) | null>(null)

  const retry = async () => {
    setFetchId(uuidv4())
    await new Promise(resolve => {
      resolveRef.current = resolve
    })
  }

  useEffect(() => {
    if (isLoadingInitialData || !resolveRef.current) return
    resolveRef.current(null)
    resolveRef.current = null
  }, [isLoadingInitialData])

  let cocktails: CocktailPostItem[] | undefined = data
    ? data.flatMap(c => c)
    : []
  if (cocktails && config) {
    cocktails = cocktails.map(cocktail =>
      produce(cocktail, draft => {
        const getAbsoluteUrl = (photo: PhotoWithBlur): PhotoWithBlur => ({
          id: photo.id,
          path: toAbsolutePath(photo.path),
          blurPath: toAbsolutePath(photo.blurPath)
        })
        draft.photos = draft.photos.map(getAbsoluteUrl)
      })
    )
  } else {
    cocktails = []
  }

  const collect = async (id: number, isCollected: boolean) => {
    if (!token || !pageData)
      return loginDialog.open({
        collectAfterLogin: true,
        redirectPath: `/cocktails/${id}`
      })

    const optimisticData = pageData.map(page => ({
      total: page.total,
      data: page.data.map(cocktail => {
        if (cocktail.id === id) return collectCocktailItem(cocktail)
        return cocktail
      })
    }))

    await mutate(optimisticData, false)

    let snackbarMessage = snackbarMessages.collectFavorite
    try {
      if (isCollected) {
        snackbarMessage = snackbarMessages.removeFavorite
        await favoriteCocktailService.remove(id, token)
      } else {
        snackbarMessage = snackbarMessages.collectFavorite

        await favoriteCocktailService.collect(id, token)
      }
    } catch (error) {
      handleError(error, { snackbarMessage: snackbarMessage.error })
      await mutate(pageData, false)
    }
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
      setSize(s => s + 1)
    }
  }, [
    error,
    inView,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    setSize
  ])

  return {
    ...result,
    cocktails,
    total,
    keyword,
    debouncedKeyword,
    isRefreshing,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    retry,
    bottomRef,
    loading: isLoadingInitialData || configLoading,
    collect
  }
}

export default useCocktailList
