import { Grid, GridProps } from '@mui/material'
import useFavoriteCocktailList from 'lib/application/cocktail/useFavoriteCocktailList'
import Error from '../status/error'
import CocktailCardSmall from '../cocktailCardSmall/cocktailCardSmall'
import CocktailCardSmallSkeleton from '../cocktailCardSmall/cocktailCardSmallSkeleton'
import ProfileEmptyBlock from '../block/profileBlock'

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
    sx={{ p: '8px' }}
  />
)

const FavoriteCocktailCardList = ({
  userId
}: FavoriteCocktailCardListProps) => {
  const {
    data: list,
    loading,
    error,
    gotoCocktailPage,
    getCardActions
  } = useFavoriteCocktailList(userId)

  const renderSkeletonList = () => (
    <CardGridContainer>
      {Array.from(new Array(6)).map((_item, index) => (
        <Grid item xs={6} key={index} sx={{ aspectRatio: '176/171' }}>
          <CocktailCardSmallSkeleton />
        </Grid>
      ))}
    </CardGridContainer>
  )

  if (error) return <Error />
  if (!list || loading) return renderSkeletonList()
  if (!list.isPublic && userId) {
    return (
      <ProfileEmptyBlock text="該用戶未開放收藏" imageSrc="/incognito.png" />
    )
  }
  if (list.data.length === 0)
    return <ProfileEmptyBlock text="沒有收藏" imageSrc="/post.png" />

  return (
    <CardGridContainer>
      {list.data.map(cocktail => (
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

export default FavoriteCocktailCardList
