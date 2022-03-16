import { useRouter } from 'next/router'
import Image from 'next/image'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { FavoriteBorder } from '@mui/icons-material'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { getUrlById, paths } from 'lib/configs/routes'
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
                  alt={name}
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
              color: '#EBEBEB'
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
          <Typography variant="h4" sx={{ color: '#EBEBEB', fontSize: '18px' }}>
            {name}
          </Typography>
          {/* <IconButton
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
          </IconButton> */}
        </Stack>
        <Stack direction="row">
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            color="#ccc"
            sx={{
              opacity: 0.9,
              fontSize: '12px'
            }}
          >
            {getIngredientsDisplay()}
          </Typography>
        </Stack>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          color="#ebebeb"
          sx={{
            opacity: 0.6,
            alignSelf: 'flex-end',
            fontSize: '11px'
          }}
        >
          {`@${userInfo.user_name}#${userInfo.user_id}`}
        </Typography>
      </Box>
    </Box>
  )
}

export default CocktailCard
