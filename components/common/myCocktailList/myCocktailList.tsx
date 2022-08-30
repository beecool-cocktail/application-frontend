import React from 'react'
import { Grid, GridProps } from '@mui/material'
import useMyCocktailList from 'lib/application/cocktail/useMyCocktailList'
import Error from '../status/error'
import CocktailCardSmall from '../cocktailCardSmall/cocktailCardSmall'
import CocktailCardSmallSkeleton from '../cocktailCardSmall/cocktailCardSmallSkeleton'
import ProfileEmptyBlock from '../block/profileBlock'

export interface MyCocktailListProps {
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

const MyCocktailList = ({ userId }: MyCocktailListProps) => {
  const { data, loading, error, gotoCocktailPage, getCardActions } =
    useMyCocktailList(userId)

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
  if (!data || loading) return renderSkeletonList()
  if (data.length === 0)
    return <ProfileEmptyBlock text="沒有！甚麼都沒有！" imageSrc="/post.png" />

  return (
    <CardGridContainer>
      {data.map(cocktail => (
        <Grid item xs={6} key={cocktail.id} sx={{ aspectRatio: '176/171' }}>
          <CocktailCardSmall
            cocktail={cocktail}
            actions={getCardActions(cocktail.collected)}
            onClick={gotoCocktailPage}
          />
        </Grid>
      ))}
    </CardGridContainer>
  )
}

export default MyCocktailList
