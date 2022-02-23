import { Stack } from '@mui/material'
import { Cocktail } from '../../../lib/types/cocktail'
import CocktailCard from './cocktailCard'

type CocktailCardListProps = {
  cocktails: Cocktail[]
}

const CocktailCardList = ({ cocktails: data }: CocktailCardListProps) => {
  const handleCollect = () => {
    // eslint-disable-next-line no-console
    console.log('collect')
  }
  return (
    <Stack spacing={2}>
      {data.map(cocktail => (
        <CocktailCard
          key={cocktail.cocktail_id}
          cocktail={cocktail}
          onCollect={handleCollect}
        />
      ))}
    </Stack>
  )
}

export default CocktailCardList
