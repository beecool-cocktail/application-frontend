import Image from 'next/image'
import { Box, IconButton, Stack, Typography, Skeleton } from '@mui/material'
import { FavoriteBorder } from '@mui/icons-material'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CocktailPostItem } from 'lib/domain/cocktail'
import useCocktailCard from 'lib/application/useCocktailCard'
import 'swiper/css'
import 'swiper/css/pagination'

export interface CocktailCardWithSkeletonProps {
  cocktail?: CocktailPostItem
}

const CocktailCardWithSkeleton = ({
  cocktail
}: CocktailCardWithSkeletonProps) => {
  if (!cocktail) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        rowGap="4px"
      >
        <Skeleton height={234} />
        <Skeleton height={25} />
        <Skeleton height={20} width={247} />
      </Box>
    )
  }
  return <CocktailCard cocktail={cocktail} />
}

export interface CocktailCardProps {
  cocktail: CocktailPostItem
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  const {
    firstImageLoaded,
    title,
    images,
    userDisplay,
    ingredientsDisplay,
    isCollected,
    gotoCocktailDetails,
    collect,
    firstImageLoadingComplete
  } = useCocktailCard(cocktail)

  if (!firstImageLoaded) return <Skeleton />

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
                  onLoadingComplete={firstImageLoadingComplete}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box position="absolute" right="15px" bottom="15px" onClick={collect}>
          <IconButton
            sx={{
              zIndex: 1,
              width: 20,
              height: 20,
              fontSize: 16,
              color: theme => {
                if (isCollected) return theme.palette.blue.main
                return theme.palette.light1.main
              }
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
            sx={{ color: theme => theme.palette.light1.main, fontSize: '18px' }}
          >
            {title}
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            color={theme => theme.palette.light2.main}
            sx={{ fontSize: '12px' }}
          >
            {ingredientsDisplay}
          </Typography>
        </Stack>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          color={theme => theme.palette.light3.main}
          sx={{
            alignSelf: 'flex-end',
            fontSize: '11px'
          }}
        >
          {userDisplay}
        </Typography>
      </Box>
    </Box>
  )
}

export default CocktailCardWithSkeleton
