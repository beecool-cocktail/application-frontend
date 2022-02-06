import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { paths } from 'lib/configs/routes'
import { Cocktail } from 'lib/types/cocktail'

type CocktailCardProps = {
  cocktail: Cocktail
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  const router = useRouter()
  const { cocktail_id: id, photo, title: name } = cocktail

  return (
    <Card>
      <CardActionArea onClick={() => router.push(paths.cocktails(id))}>
        <Box height={140} width={1} position="relative">
          <Image layout="fill" src={photo} alt={name} />
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
