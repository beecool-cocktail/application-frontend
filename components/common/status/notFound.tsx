import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import { useRef } from 'react'

const NotFound = () => {
  const { current: isEasterEggTriggered } = useRef(Math.random() < 0.1)

  if (isEasterEggTriggered) {
    return (
      <Box width="100%">
        <Image
          src="/not-found-easter-egg.png"
          alt="查無結果，換個形容方式吧：）"
          layout="responsive"
          width={392}
          height={362}
        />
      </Box>
    )
  }
  return (
    <Typography variant="h1" display="inline">
      我不知道！
    </Typography>
  )
}

export default NotFound
