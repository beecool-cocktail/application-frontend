import { useRouter } from 'next/router'
import Image from 'next/image'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { FavoriteBorder } from '@mui/icons-material'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { getUrlById, paths } from 'lib/configs/routes'
import { CocktailPostItem } from 'lib/domain/cocktail'
import { FALLBACK_URL } from 'lib/constants/image'

export interface CocktailCardProps {
  cocktail: CocktailPostItem
  onCollect(id: number): void
}

const CocktailCard = ({ cocktail, onCollect }: CocktailCardProps) => {
  const router = useRouter()
  const { id, photoUrls, title, ingredients, userId, userName } = cocktail

  const images = photoUrls.map(p => {
    if (new URL(p).pathname === '/') return FALLBACK_URL
    return p
  })
  const gotoCocktailDetails = () =>
    router.push(getUrlById(paths.cocktailById, id))

  const getIngredientsDisplay = () => {
    let result = ''
    ingredients.forEach((ingredient, index) => {
      if (index === ingredients.length - 1) result += ingredient.name
      else result += `${ingredient.name} / `
    })
    return result
  }

  return (
    <Box sx={{ backgroundColor: 'transparent' }} onClick={gotoCocktailDetails}>
      <Box
        width={1}
        position="relative"
        overflow="hidden"
        style={{ cursor: 'grab' }}
      >
        <Box borderRadius="10px" overflow="hidden">
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
                  alt={title}
                  width={400}
                  height={300}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box
          position="absolute"
          right="15px"
          bottom="15px"
          onClick={() => onCollect(id)}
        >
          <IconButton
            sx={{
              zIndex: 1,
              width: 20,
              height: 20,
              fontSize: 16,
              color: 'light1.main'
            }}
          >
            <FavoriteBorder />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          p: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          lineHeight: 1.4
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing="4px"
        >
          <Typography
            variant="h4"
            sx={{ color: 'light1.main', fontSize: '18px' }}
          >
            {title}
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            color="light2.main"
            sx={{ fontSize: '12px' }}
          >
            {getIngredientsDisplay()}
          </Typography>
        </Stack>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          color="light3.main"
          sx={{
            alignSelf: 'flex-end',
            fontSize: '11px'
          }}
        >
          {`@${userName}#${userId}`}
        </Typography>
      </Box>
    </Box>
  )
}

export default CocktailCard
