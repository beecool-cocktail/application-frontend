import Image from 'next/image'
import { Box, Typography } from '@mui/material'

const isEasterEggTriggered = () => {
  return Math.random() < 0.1
}

const NotFound = () => {
  if (isEasterEggTriggered()) {
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
