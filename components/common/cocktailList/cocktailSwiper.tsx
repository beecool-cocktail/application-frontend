import React, { useState } from 'react'
import Image from 'next/image'
import { Box, IconButton } from '@mui/material'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Favorite from 'lib/assets/like/default.svg'
import 'swiper/css'
import 'swiper/css/pagination'
import { PhotoWithBlur } from 'lib/domain/photo'

export interface CocktailSwiperProps {
  title: string
  images: PhotoWithBlur[]
  isCollected: boolean
  preloadAmount?: number
  rounded?: boolean
  onCollect(): void
  onFirstImageLoadingComplete?(): void
}

const CocktailSwiper = ({
  title,
  images,
  isCollected,
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
          style={{ borderRadius: rounded ? 10 : 0 }}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSlideChange={swiper => {
            if (swiper.activeIndex <= preloadIndex - preloadAmount) return
            setPreloadIndex(swiper.activeIndex + preloadAmount)
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              {index <= preloadIndex && (
                <Image
                  style={{ borderRadius: rounded ? 10 : 0 }}
                  layout="responsive"
                  placeholder={image.blurPath ? 'blur' : 'empty'}
                  src={image.path}
                  blurDataURL={image.blurPath}
                  width={400}
                  height={300}
                  alt={title}
                  onLoadingComplete={handleLoadingComplete(index)}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box
        position="absolute"
        right="16px"
        bottom="16px"
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          onCollect()
        }}
      >
        <IconButton
          sx={{
            p: 0,
            zIndex: 1,
            fontSize: '24px',
            '& *': {
              stroke: theme => theme.palette.light1.main,
              fill: theme => {
                if (isCollected) return theme.palette.primary.main
                return theme.palette.light3.main
              }
            }
          }}
        >
          <Favorite />
        </IconButton>
      </Box>
    </Box>
  )
}

export default CocktailSwiper
