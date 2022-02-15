import Image from 'next/image'
import { Box } from '@mui/system'
import { useSpring, animated } from 'react-spring'
import { useDrag } from '@use-gesture/react'
import { Cocktail } from 'lib/types/cocktail'

export type ImageCarouselProps = {
  cocktail: Cocktail
}

const ImageCarousel = ({ cocktail }: ImageCarouselProps) => {
  const [{ x }, api] = useSpring(() => {
    {
      // x: 0
    }
  })

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({
      x: down ? mx : 0,
      y: down ? my : 0,
      immediate: down
    })
  })

  return (
    <Box width={1}>
      <animated.div {...bind()} style={{ x }}>
        <Image
          src={cocktail.photo}
          alt={cocktail.title}
          width="100%"
          height={250}
        />
      </animated.div>
    </Box>
  )
}

export default ImageCarousel
