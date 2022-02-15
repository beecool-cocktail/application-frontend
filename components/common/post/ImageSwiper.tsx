import Image from 'next/image'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface ImageSwiperProps {
  title: string
  photos: string[]
}

const ImageSwiper = ({ title, photos }: ImageSwiperProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {photos.map(photo => (
        <SwiperSlide key={photo}>
          <Image src={photo} alt={title} layout="fill" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSwiper
