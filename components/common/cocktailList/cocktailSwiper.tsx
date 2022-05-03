import React, { useState } from 'react'
import Image from 'next/image'
import { Box, IconButton } from '@mui/material'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Favorite from 'lib/assets/like/default.svg'
import 'swiper/css'
import 'swiper/css/pagination'

export interface CocktailSwiperProps {
  title: string
  images: string[]
  isCollected: boolean
  preloadAmount?: number
  onCollect(): void
  onFirstImageLoadingComplete(): void
}

const CocktailSwiper = ({
  title,
  images,
  isCollected,
  preloadAmount = 1,
  onCollect,
  onFirstImageLoadingComplete
}: CocktailSwiperProps) => {
  const [preloadIndex, setPreloadIndex] = useState(preloadAmount)
  const handleLoadingComplete = (index: number) => () => {
    if (index !== 0) return
    onFirstImageLoadingComplete()
  }

  return (
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
          onSlideChange={swiper => {
            if (swiper.activeIndex <= preloadIndex - preloadAmount) return
            setPreloadIndex(swiper.activeIndex + preloadAmount)
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              {index <= preloadIndex && (
                <Image
                  layout="responsive"
                  src={image}
                  alt={title}
                  width={400}
                  height={300}
                  onLoadingComplete={handleLoadingComplete(index)}
                />
              )}
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
