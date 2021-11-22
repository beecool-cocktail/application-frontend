import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import { Cocktail } from '../../types/cocktail'

type CocktailCardProps = {
  cocktail: Cocktail
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="140" image={cocktail.imageUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cocktail.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CocktailCard
