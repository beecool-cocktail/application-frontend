import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import { FavoriteBorder, ChevronRight } from '@mui/icons-material'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { paths } from 'lib/configs/routes'
import { Cocktail } from 'lib/types/cocktail'
import { FALLBACK_URL } from 'lib/constants/image'

export interface CocktailCardProps {
  cocktail: Cocktail
  onCollect(id: number): void
}

const CocktailCard = ({ cocktail, onCollect }: CocktailCardProps) => {
  const router = useRouter()
  const {
    cocktail_id: id,
    photos,
    title: name,
    ingredients,
    userInfo
  } = cocktail

  const images = photos.map(p => {
    if (new URL(p).pathname === '/') return FALLBACK_URL
    return p
  })
  const gotoCocktailDetails = () => router.push(paths.cocktails(id))

  const getIngredientsDisplay = () => {
    let result = ''
    ingredients.forEach((ingredient, index) => {
      if (index === ingredients.length - 1) result += ingredient.name
      else result += `${ingredient.name} / `
    })
    return result
  }

  return (
    <Card sx={{ backgroundColor: 'transparent', borderRadius: '10px' }}>
      <Box
        width={1}
        position="relative"
        overflow="hidden"
        style={{ cursor: 'grab' }}
      >
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                layout="responsive"
                src={image}
                alt={name}
                width={400}
                height={300}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Box
          position="absolute"
          right="30px"
          bottom="30px"
          onClick={() => onCollect(id)}
        >
          <IconButton
            sx={{
              zIndex: 1,
              width: 20,
              height: 20,
              fontSize: 16,
              color: 'white'
            }}
          >
            <FavoriteBorder />
          </IconButton>
        </Box>
      </Box>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">{name}</Typography>
          <IconButton
            onClick={gotoCocktailDetails}
            sx={{
              border: '1px solid black',
              borderRadius: '50%',
              width: 24,
              height: 24,
              fontSize: 16,
              color: 'black',
              padding: 0
            }}
          >
            <ChevronRight sx={{ width: '100%', height: '100%' }} />
          </IconButton>
        </Stack>
        <Typography gutterBottom variant="body2" component="div" color="#888">
          {`@${userInfo.user_name}#${userInfo.user_id}`}
        </Typography>
        <Stack direction="row">
          <Typography gutterBottom variant="body2" component="div" color="#888">
            {getIngredientsDisplay()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CocktailCard
