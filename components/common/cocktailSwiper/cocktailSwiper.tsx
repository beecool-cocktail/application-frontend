import React, { useState } from 'react'
import Image from 'next/image'
import { Box, IconButton } from '@mui/material'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import LikeIcon from 'lib/assets/like.svg'
import 'swiper/css'
import 'swiper/css/pagination'
import { PhotoWithBlur } from 'lib/domain/photo'
import FallbackCocktailImage from './fallbackCocktailImage'

export interface CocktailSwiperProps {
  title: string
  images: PhotoWithBlur[]
  isCollected: boolean
  isCard?: boolean
  preloadAmount?: number
  rounded?: boolean
  onCollect?(): void
  onFirstImageLoadingComplete?(): void
}

const CocktailSwiper = ({
  title,
  images,
  isCollected,
  isCard,
  preloadAmount = 1,
  rounded = false,
  onCollect,
  onFirstImageLoadingComplete
}: CocktailSwiperProps) => {
  const [preloadIndex, setPreloadIndex] = useState(preloadAmount)
  const handleLoadingComplete = (index: number) => () => {
    if (index !== 0) return
    onFirstImageLoadingComplete?.()
  }

  const favoriteButtonMargin = isCard ? '12px' : '16px'

  const renderFallbackImage = () => {
    return (
      <FallbackCocktailImage onLoadingComplete={handleLoadingComplete(0)} />
    )
  }

  const renderSwiperImages = () => {
    return images.map((image, index) => {
      return (
        <SwiperSlide key={index}>
          {index <= preloadIndex && (
            <Box sx={{ width: '100%', aspectRatio: '4/3' }}>
              <Image
                src={image.path}
                blurDataURL={image.blurPath}
                alt={title}
                fill
                placeholder="blur"
                style={{
                  objectFit: 'cover',
                  borderRadius: rounded ? 10 : 0
                }}
                onLoadingComplete={handleLoadingComplete(index)}
              />
            </Box>
          )}
        </SwiperSlide>
      )
    })
  }

  return (
    <Box
      width={1}
      position="relative"
      overflow="hidden"
      style={{ cursor: 'grab' }}
    >
      <Box
        borderRadius={rounded ? '10px' : 0}
        overflow="hidden"
        position="relative"
        sx={{
          '& .swiper-slide': {
            lineHeight: 0
          },
          '& .swiper-pagination': {
            lineHeight: 0,
            position: 'absolute',
            bottom: '0 !important',
            pt: '32px',
            pb: '8px',
            height: 44,
            background:
              'radial-gradient(147.73% 147.73% at 50.16% 118.18%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 56.25%)'
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
          style={{ borderRadius: rounded ? 10 : 0 }}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSlideChange={swiper => {
            if (swiper.activeIndex <= preloadIndex - preloadAmount) return
            setPreloadIndex(swiper.activeIndex + preloadAmount)
          }}
        >
          {images.length !== 0 ? renderSwiperImages() : renderFallbackImage()}
        </Swiper>
      </Box>
      <Box
        position="absolute"
        right={favoriteButtonMargin}
        bottom={favoriteButtonMargin}
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          onCollect?.()
        }}
      >
        <IconButton
          sx={{
            p: 0,
            zIndex: 1,
            fontSize: '24px',
            color: theme => {
              if (isCollected) return theme.palette.primary.main
              return theme.palette.light3.main
            }
          }}
        >
          <LikeIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default CocktailSwiper
