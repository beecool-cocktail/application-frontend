import { Stack, Typography } from '@mui/material'
import { CocktailPostItem } from 'lib/domain/cocktail'
import useCocktailCard from 'lib/application/useCocktailCard'
import CocktailSkeleton from './cocktailSkeleton'
import CocktailSwiper from './cocktailSwiper'

export interface CocktailCardProps {
  cocktail: CocktailPostItem
  onCollect: (id: number, isCollected: boolean) => void
}

const CocktailCard = ({ cocktail, onCollect }: CocktailCardProps) => {
  const {
    firstImageLoaded,
    title,
    images,
    userDisplay,
    isCollected,
    gotoCocktailDetails,
    collect,
    firstImageLoadingComplete
  } = useCocktailCard(cocktail, onCollect)

  return (
    <>
      {!firstImageLoaded && <CocktailSkeleton />}
      <Stack
        visibility={firstImageLoaded ? 'visible' : 'hidden'}
        alignItems="flex-start"
        justifyContent="space-between"
        spacing="4px"
        sx={{ backgroundColor: 'transparent' }}
        onClick={gotoCocktailDetails}
      >
        <CocktailSwiper
          title={title}
          images={images}
          isCollected={isCollected}
          onCollect={collect}
          onFirstImageLoadingComplete={firstImageLoadingComplete}
        />
        <Stack
          width={1}
          alignItems="flex-start"
          justifyContent="space-between"
          spacing="4px"
          px="4px"
          pb="4px"
        >
          <Typography
            variant="subtitle1"
            sx={{
              pr: '32px',
              color: theme => theme.palette.light1.main,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {title}
          </Typography>
          <Stack
            component="ul"
            direction="column"
            width={1}
            p={0}
            m={0}
            sx={{ listStylePosition: 'inside' }}
          >
            {cocktail.ingredients.map((ingredient, index) => (
              <Typography
                key={index}
                variant="body3"
                component="li"
                color={theme => theme.palette.light2.main}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  '&::marker': {
                    content: '"·"',
                    textAlign: 'center !important'
                  }
                }}
              >
                {ingredient.name}
              </Typography>
            ))}
          </Stack>
          <Typography
            variant="body4"
            component="div"
            alignSelf="flex-end"
            color={theme => theme.palette.light4.main}
          >
            {userDisplay}
          </Typography>
        </Stack>
      </Stack>
    </>
  )
}

export default CocktailCard
