import React from 'react'
import { Grid, Typography } from '@mui/material'
import useFavoriteCocktailList from 'lib/application/cocktail/useFavoriteCocktailList'
import Error from '../status/error'
import Loading from '../status/loading'
import FavoriteCocktailCard from './favoriteCocktailCard'

export interface FavoriteCocktailCardListProps {
  userId?: number
}

const FavoriteCocktailCardList = ({
  userId
}: FavoriteCocktailCardListProps) => {
  const { data: list, loading, error, remove } = useFavoriteCocktailList(userId)
  if (error) return <Error />
  if (!list || loading) return <Loading />
  if (!list.isPublic && userId)
    return <Typography variant="h4">收藏不公開</Typography>
  if (list.data.length === 0)
    return <Typography variant="h4">沒有收藏 QQ</Typography>

  return (
    <Grid container alignItems="flex-start" rowSpacing={1} columnSpacing={1}>
      {list.data.map(cocktail => (
        <Grid item xs={6} key={cocktail.id}>
          <FavoriteCocktailCard
            cocktail={cocktail}
            editable={!userId}
            onRemove={remove}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default FavoriteCocktailCardList
