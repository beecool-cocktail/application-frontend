import React from 'react'
import { Grid, Typography } from '@mui/material'
import useFavoriteCocktailList from 'lib/application/useFavoriteCocktailList'
import Error from '../status/error'
import Loading from '../status/loading'
import FavoriteCocktailCard from './favoriteCocktailCard'

const FavoriteCocktailCardList = () => {
  const { data, loading, error, remove } = useFavoriteCocktailList()
  if (error) return <Error />
  if (!data || loading) return <Loading />
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
