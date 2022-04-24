import { Stack } from '@mui/material'
import { PAGE_SIZE } from 'lib/constants/pagination'
import { CocktailPostItem } from 'lib/domain/cocktail'
import CocktailCard from './cocktailCard'

type CocktailCardListProps = {
  cocktails: CocktailPostItem[]
  isLoadingInitialData: boolean
  onCollect: (id: number, isCollected: boolean) => void
}

const CocktailCardList = ({
  cocktails,
  isLoadingInitialData,
  onCollect
}: CocktailCardListProps) => {
  return (
    <Stack
      spacing="24px"
      sx={{
        pt: '24px',
        px: '32px',
        backgroundColor: theme => theme.palette.dark2.main
      }}
    >
      {isLoadingInitialData
        ? Array.from(new Array(PAGE_SIZE)).map((item, index) => (
            <CocktailCard key={index} cocktail={item} onCollect={onCollect} />
          ))
        : cocktails.map(cocktail => (
            <CocktailCard
              key={cocktail.id}
              cocktail={cocktail}
              onCollect={onCollect}
            />
          ))}
    </Stack>
  )
}

export default CocktailCardList
