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
import { FALLBACK_URL } from 'lib/constants/image'

type CocktailCardProps = {
  cocktail: Cocktail
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  const router = useRouter()
  const { cocktail_id: id, photo, title: name } = cocktail

  let src = photo
  if (new URL(src).pathname === '/') src = FALLBACK_URL

  return (
    <Card>
      <CardActionArea onClick={() => router.push(paths.cocktails(id))}>
        <Box height={140} width={1} position="relative">
          <Image layout="fill" src={src} alt={name} />
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
