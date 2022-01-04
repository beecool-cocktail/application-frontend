import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import { Cocktail } from '../../types/cocktail'
import { paths } from '../../configs/routes'

type CocktailCardProps = {
  cocktail: Cocktail
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  const { cocktail_id: id, photo: imageUrl, title: name } = cocktail
  const router = useRouter()

  return (
    <Card>
      <CardActionArea onClick={() => router.push(paths.cocktail(id))}>
        <CardMedia component="img" height="140" image={imageUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CocktailCard
