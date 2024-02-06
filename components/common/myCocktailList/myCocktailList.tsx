import React from 'react'
import { Box } from '@mui/material'
import useMyCocktailList from 'lib/application/hooks/cocktail/useMyCocktailList'
import cryDogIllustration from 'public/illustrations/meme_cryDog.png'
import Error from '../status/error'
import CocktailCardSmall from '../cocktailCardSmall/cocktailCardSmall'
import IllustrationWithText from '../image/illustrationWithText'
import CardGridContainer from '../cocktailCardSmall/cocktailCardSmallContainer'
import CocktailCardSmallContainerSkeleton from '../cocktailCardSmall/cocktailCardSmallContainerSkeleton'

export interface MyCocktailListProps {
  userId?: number
}

const MyCocktailList = ({ userId }: MyCocktailListProps) => {
  const { data, loading, error, gotoCocktailPage, getCardActions } =
    useMyCocktailList(userId)

  if (error) return <Error />
  if (!data || loading) return <CocktailCardSmallContainerSkeleton />
  if (data.length === 0) {
    return (
      <Box mt="40px" px="40px" alignItems="center" justifyContent="center">
        <IllustrationWithText
          imgSrc={cryDogIllustration}
          text="還沒有任何發文哦！"
        />
      </Box>
    )
  }

  return (
    <CardGridContainer>
      {data.map(cocktail => (
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

export default MyCocktailList
