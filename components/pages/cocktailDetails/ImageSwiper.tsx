import Image from 'next/image'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Cocktail } from 'lib/types/cocktail'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface ImageSwiperProps {
  cocktail: Cocktail
}

const ImageSwiper = ({ cocktail }: ImageSwiperProps) => {
  const { title } = cocktail
  const photoSrc = '/' + cocktail.photo

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <SwiperSlide>
        <Image src={photoSrc} alt={title} layout="fill" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={photoSrc} alt={title} layout="fill" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={photoSrc} alt={title} layout="fill" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={photoSrc} alt={title} layout="fill" />
      </SwiperSlide>
    </Swiper>
  )
}

export default ImageSwiper
