import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import { useRef } from 'react'

const isEasterEggTriggered = () => Math.random() < 0.1

const NotFound = () => {
  const isEasterEggTriggeredRef = useRef(isEasterEggTriggered())

  if (isEasterEggTriggeredRef.current) {
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
    <Typography variant="body1" display="inline">
      查無結果，換個形容方式吧：）
    </Typography>
  )
}

export default NotFound