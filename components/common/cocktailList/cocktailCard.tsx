import Image from 'next/image'
import { Box, IconButton, Stack, Typography, Skeleton } from '@mui/material'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Favorite from 'lib/assets/like/default.svg'
import { CocktailPostItem } from 'lib/domain/cocktail'
import useCocktailCard from 'lib/application/useCocktailCard'
import 'swiper/css'
import 'swiper/css/pagination'

export interface CocktailCardWithSkeletonProps {
  cocktail?: CocktailPostItem
  onCollect: (id: number, isCollected: boolean) => void
}

const CocktailCardWithSkeleton = ({
  cocktail,
  onCollect
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
        <Skeleton height={234} width="100%" />
        <Skeleton height={25} width="100%" />
        <Skeleton height={20} width={247} />
      </Box>
    )
  }
  return <CocktailCard cocktail={cocktail} onCollect={onCollect} />
}

export interface CocktailCardProps {
  cocktail: CocktailPostItem
  onCollect: (id: number, isCollected: boolean) => void
}

const CocktailCard = ({ cocktail, onCollect }: CocktailCardProps) => {
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
  } = useCocktailCard(cocktail, onCollect)

  if (!firstImageLoaded) return <Skeleton />

  return (
    <Box sx={{ backgroundColor: 'transparent' }} onClick={gotoCocktailDetails}>
      <Box
        width={1}
        position="relative"
        overflow="hidden"
        style={{ cursor: 'grab' }}
      >
        <Box
          borderRadius="10px"
          overflow="hidden"
          sx={{
            '& .swiper-pagination': {
              bottom: '8px',
              lineHeight: 0
            },
            '& .swiper-pagination-bullet': {
              width: '4px',
              height: '4px',
              background: theme => theme.palette.light4.main,
              opacity: 1,
              marginLeft: '2px !important',
              marginRight: '2px !important'
            },
            '& .swiper-pagination-bullet-active': {
              backgroundColor: theme => theme.palette.light1.main,
              opacity: 1
            }
          }}
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
                  alt={title}
                  width={400}
                  height={300}
                  onLoadingComplete={firstImageLoadingComplete}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box
          position="absolute"
          right="12px"
          bottom="12px"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            collect()
          }}
        >
          <IconButton
            sx={{
              p: 0,
              zIndex: 1,
              fontSize: '24px',
              '& *': {
                stroke: theme => theme.palette.light4.main,
                fill: theme => {
                  if (isCollected) return theme.palette.blue.main
                  return theme.palette.light1.main
                }
              }
            }}
          >
            <Favorite />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          p: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
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
