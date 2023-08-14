import Image, { StaticImageData } from 'next/image'
import { Stack, Typography } from '@mui/material'

export interface IllustrationWithTextProps {
  textFirst?: boolean
  imgSrc: string | StaticImageData
  text: string
}

const IllustrationWithText = ({
  textFirst = false,
  imgSrc,
  text
}: IllustrationWithTextProps) => {
  const renderText = () => (
    <Typography
      variant="logoS"
      textAlign="center"
      sx={{ color: theme => theme.palette.light1.main }}
    >
      {text}
    </Typography>
  )

  const renderImage = () => (
    <Image src={imgSrc} alt={text} style={{ width: '100%', height: '100%' }} />
  )

  if (textFirst) {
    return (
      <Stack spacing="40px" alignItems="center">
        {renderText()}
        {renderImage()}
      </Stack>
    )
  }

  return (
    <Stack alignItems="center">
      {renderImage()}
      {renderText()}
    </Stack>
  )
}

export default IllustrationWithText
