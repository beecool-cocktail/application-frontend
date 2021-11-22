import { Stack } from '@mui/material'
import { Cocktail } from '../../types/cocktail'
import CocktailCard from './cocktailCard'

type CocktailCardListProps = {
  data: Cocktail[]
}

const CocktailCardList = ({ data }: CocktailCardListProps) => {
  return (
    <Stack spacing={2}>
      {data.map(cocktail => {
        return <CocktailCard key={cocktail.id} cocktail={cocktail} />
      })}
    </Stack>
  )
}

export default CocktailCardList
