import Image from 'next/image'
import { Box } from '@mui/system'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

export interface ImageSwiperProps {
  title: string
  photos: string[]
}

const ImageSwiper = ({ title, photos }: ImageSwiperProps) => {
  return (
    <Box position="relative" style={{ cursor: 'grab' }}>
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {photos.map((image, index) => (
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
  )
}

export default ImageSwiper
