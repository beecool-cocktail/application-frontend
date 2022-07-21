import React from 'react'
import { Grid, Typography } from '@mui/material'
import useFavoriteCocktailList from 'lib/application/cocktail/useFavoriteCocktailList'
import Error from '../status/error'
import Loading from '../status/loading'
import CocktailCardSmall from '../cocktailCardSmall/cocktailCardSmall'

export interface FavoriteCocktailCardListProps {
  userId?: number
}

const FavoriteCocktailCardList = ({
  userId
}: FavoriteCocktailCardListProps) => {
  const {
    data: list,
    loading,
    error,
    shareCocktail,
    gotoCocktailPage,
    removeCocktail
  } = useFavoriteCocktailList(userId)

  if (error) return <Error />
  if (!list || loading) return <Loading />
  if (!list.isPublic && userId)
    return <Typography variant="h4">收藏不公開</Typography>
  if (list.data.length === 0)
    return <Typography variant="h4">沒有收藏 QQ</Typography>

  return (
    <Grid
      container
      alignItems="flex-start"
      rowSpacing="8px"
      columnSpacing="8px"
      sx={{ p: '8px', color: theme => theme.palette.dark3.main }}
    >
      {list.data.map(cocktail => (
        <Grid item xs={6} key={cocktail.id} sx={{ aspectRatio: '176/171' }}>
          <CocktailCardSmall
            cocktail={cocktail}
            actions={[
              { text: '分享貼文', onClick: shareCocktail },
              { text: '移除收藏', onClick: removeCocktail }
            ]}
            onClick={gotoCocktailPage}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default FavoriteCocktailCardList
