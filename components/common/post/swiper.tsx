import { Box } from '@mui/material'
import { PhotoWithBlur } from 'lib/domain/photo'
import CocktailSwiper from '../cocktailList/cocktailSwiper'

interface SwiperProps {
  title: string
  photoUrls: PhotoWithBlur[]
  isCollected: boolean
  onCollect?(): void
}

const Swiper = ({ title, photoUrls, isCollected, onCollect }: SwiperProps) => {
  return (
    <Box>
      <CocktailSwiper
        title={title}
        images={photoUrls}
        isCollected={isCollected}
        onCollect={() => onCollect?.()}
      />
    </Box>
  )
}

export default Swiper
