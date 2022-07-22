import React from 'react'
import { Grid, GridProps, Typography } from '@mui/material'
import useFavoriteCocktailList from 'lib/application/cocktail/useFavoriteCocktailList'
import Error from '../status/error'
import CocktailCardSmall from '../cocktailCardSmall/cocktailCardSmall'
import CocktailCardSmallSkeleton from '../cocktailCardSmall/cocktailCardSmallSkeleton'

export interface FavoriteCocktailCardListProps {
  userId?: number
}

const CardGridContainer = (props: GridProps) => (
  <Grid
    {...props}
    container
    alignItems="flex-start"
    rowSpacing="8px"
    columnSpacing="8px"
    sx={{ p: '8px', color: theme => theme.palette.dark3.main }}
  />
)

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

  const renderSkeletonList = () => (
    <CardGridContainer>
      {Array.from(new Array(6)).map((item, index) => (
        <Grid item xs={6} key={index} sx={{ aspectRatio: '176/171' }}>
          <CocktailCardSmallSkeleton />
        </Grid>
      ))}
    </CardGridContainer>
  )

  if (error) return <Error />
  if (!list || loading) return renderSkeletonList()
  if (!list.isPublic && userId)
    return <Typography variant="h4">收藏不公開</Typography>
  if (list.data.length === 0)
    return <Typography variant="h4">沒有收藏 QQ</Typography>

  return (
    <CardGridContainer>
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
    </CardGridContainer>
  )
}

export default FavoriteCocktailCardList
