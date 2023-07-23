import Image from 'next/image'
import { Box } from '@mui/material'
import { SwiperSlide } from 'swiper/react'
import fallbackImage from '/public/cocktail.jpg'

export interface FallbackCocktailImageProps {
  rounded?: boolean
  onLoadingComplete?(): void
}

const FallbackCocktailImage = ({
  rounded = false,
  onLoadingComplete
}: FallbackCocktailImageProps) => {
  return (
    <SwiperSlide>
      <Box sx={{ width: '100%', aspectRatio: '4/3' }}>
        <Image
          src={fallbackImage}
          alt="Default Cocktail Image"
          fill
          placeholder="blur"
          style={{
            objectFit: 'cover',
            borderRadius: rounded ? 10 : 0
          }}
          onLoadingComplete={onLoadingComplete}
        />
      </Box>
    </SwiperSlide>
  )
}

export default FallbackCocktailImage
