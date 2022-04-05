import { Stack } from '@mui/material'
import { CocktailPostItem } from 'lib/domain/cocktail'
import CocktailCard from './cocktailCard'

type CocktailCardListProps = {
  cocktails: CocktailPostItem[]
}

const CocktailCardList = ({ cocktails: data }: CocktailCardListProps) => {
  const handleCollect = () => {
    // eslint-disable-next-line no-console
    console.log('collect')
  }
  return (
    <Stack
      spacing="24px"
      sx={{
        pt: '24px',
        px: '32px',
        backgroundColor: 'dark2.main'
      }}
    >
      {data.map(cocktail => (
        <CocktailCard
          key={cocktail.id}
          cocktail={cocktail}
          onCollect={handleCollect}
        />
      ))}
    </Stack>
  )
}

export default CocktailCardList
