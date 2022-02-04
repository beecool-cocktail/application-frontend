import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Cocktail } from 'lib/types/cocktail'
import { paths } from 'lib/configs/routes'

type CocktailCardProps = {
  cocktail: Cocktail
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  const { cocktail_id: id, photo: imageUrl, title: name } = cocktail
  const router = useRouter()

  return (
    <Card>
      <CardActionArea onClick={() => router.push(paths.cocktail(id))}>
        <Box height={140} width={1} position="relative">
          <Image layout="fill" src={imageUrl} alt={name} />
        </Box>
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
