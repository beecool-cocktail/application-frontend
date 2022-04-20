import React from 'react'
import { Grid, Typography } from '@mui/material'
import produce from 'immer'
import useFavoriteCocktailListService from 'lib/services/favoriteCocktailListAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useSnackbar from 'lib/application/useSnackbar'
import useConfig from 'lib/hooks/useConfig'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import { FavoriteCocktailItem } from 'lib/domain/cocktail'
import Error from '../status/error'
import Spinner from '../status/spinner'
import FavoriteCocktailCard from './favoriteCocktailCard'

const useFavoriteCocktailList = () => {
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const { config, loading: configLoading } = useConfig()
  const favoriteCocktailListService = useFavoriteCocktailListService()
  const result = favoriteCocktailListService.getList()

  let cocktails: FavoriteCocktailItem[] | undefined
  if (result.data && config) {
    cocktails = result.data.map(cocktail =>
      produce(cocktail, draft => {
        draft.photoUrl = draft.photoUrl
          ? join(config.staticBaseUrl, draft.photoUrl)
          : FALLBACK_URL
      })
    )
  }

  const remove = async (id: number) => {
    const token = storage.getToken()
    if (!token) return
    await favoriteCocktailListService.remove(id, token)
    result.mutate()
    snackbar.success('remove success')
  }

  return {
    ...result,
    data: cocktails,
    loading: (result.data && result.error) || configLoading,
    remove
  }
}

const FavoriteCocktailCardList = () => {
  const { data, loading, error, remove } = useFavoriteCocktailList()
  if (error) return <Error />
  if (!data || loading) return <Spinner />
  if (data.length === 0)
    return <Typography variant="h4">沒有收藏 QQ</Typography>

  return (
    <Grid container alignItems="flex-start" rowSpacing={1} columnSpacing={1}>
      {data.map(cocktail => (
        <Grid item xs={6} key={cocktail.id}>
          <FavoriteCocktailCard cocktail={cocktail} onRemove={remove} />
        </Grid>
      ))}
    </Grid>
  )
}

export default FavoriteCocktailCardList
