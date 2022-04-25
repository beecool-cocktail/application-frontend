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
        <Skeleton
          variant="rectangular"
          height="unset"
          width="100%"
          sx={{ borderRadius: '10px', aspectRatio: '4/3' }}
        />
        <Stack width={1} spacing="4px" px="2px" py="4px">
          <Skeleton
            variant="rectangular"
            height={25}
            width="100%"
            sx={{ borderRadius: '4px' }}
          />
          <Skeleton
            variant="rectangular"
            height={20}
            width={247}
            sx={{ borderRadius: '4px' }}
          />
        </Stack>
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
    isCollected,
    gotoCocktailDetails,
    collect,
    firstImageLoadingComplete
  } = useCocktailCard(cocktail, onCollect)

  if (!firstImageLoaded) return <Skeleton />

  return (
    <Stack
      alignItems="flex-start"
      justifyContent="space-between"
      spacing="4px"
      sx={{ backgroundColor: 'transparent' }}
      onClick={gotoCocktailDetails}
    >
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
      <Stack
        width={1}
        alignItems="flex-start"
        justifyContent="space-between"
        spacing="4px"
        px="4px"
        pb="4px"
      >
        <Typography
          variant="subtitle1"
          sx={{
            pr: '32px',
            color: theme => theme.palette.light1.main,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical'
          }}
        >
          {title}
        </Typography>
        <Stack
          component="ul"
          direction="column"
          width={1}
          p={0}
          m={0}
          sx={{ listStylePosition: 'inside' }}
        >
          {cocktail.ingredients.map((ingredient, index) => (
            <Typography
              key={index}
              variant="body3"
              component="li"
              color={theme => theme.palette.light2.main}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                '&::marker': {
                  content: '"·"',
                  textAlign: 'center !important'
                }
              }}
            >
              {ingredient.name}
            </Typography>
          ))}
        </Stack>
        <Typography
          variant="body4"
          component="div"
          alignSelf="flex-end"
          color={theme => theme.palette.light4.main}
        >
          {userDisplay}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default CocktailCardWithSkeleton
