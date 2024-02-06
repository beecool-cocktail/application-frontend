import { Box } from '@mui/material'
import useFavoriteCocktailList from 'lib/application/hooks/cocktail/useFavoriteCocktailList'
import noWayDeerIllustration from 'public/illustrations/meme_nowayDeer.png'
import Error from '../status/error'
import CocktailCardSmall from '../cocktailCardSmall/cocktailCardSmall'
import IllustrationWithText from '../image/illustrationWithText'
import CocktailCardSmallContainerSkeleton from '../cocktailCardSmall/cocktailCardSmallContainerSkeleton'
import CardGridContainer from '../cocktailCardSmall/cocktailCardSmallContainer'

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
    gotoCocktailPage,
    getCardActions
  } = useFavoriteCocktailList(userId)

  if (error) return <Error />
  if (!list || loading) return <CocktailCardSmallContainerSkeleton />
  if (!list.isPublic && userId) {
    return (
      <Box mt="40px" px="40px" alignItems="center" justifyContent="center">
        <IllustrationWithText
          imgSrc={noWayDeerIllustration}
          text="該用戶未開放收藏"
        />
      </Box>
    )
  }
  if (list.data.length === 0)
    return (
      <Box mt="40px" px="40px" alignItems="center" justifyContent="center">
        <IllustrationWithText
          imgSrc={noWayDeerIllustration}
          text="還沒有任何收藏喔！"
        />
      </Box>
    )

  return (
    <CardGridContainer>
      {list.data.map(cocktail => (
        <CardGridContainer.Item key={cocktail.id}>
          <CocktailCardSmall
            cocktail={cocktail}
            actions={getCardActions(cocktail.collected)}
            onClick={gotoCocktailPage}
          />
        </CardGridContainer.Item>
      ))}
    </CardGridContainer>
  )
}

export default FavoriteCocktailCardList
