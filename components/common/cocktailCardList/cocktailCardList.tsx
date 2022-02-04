import { Stack } from '@mui/material'
import { Cocktail } from '../../../lib/types/cocktail'
import CocktailCard from './cocktailCard'

type CocktailCardListProps = {
  data: Cocktail[]
}

const CocktailCardList = ({ data }: CocktailCardListProps) => {
  return (
    <Stack spacing={2}>
      {data.map(cocktail => (
        <CocktailCard key={cocktail.cocktail_id} cocktail={cocktail} />
      ))}
    </Stack>
  )
}

export default CocktailCardList
