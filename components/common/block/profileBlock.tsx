import Image from 'next/image'
import { Stack, Box, Typography } from '@mui/material'

interface ProfileEmptyBlockProps {
  text: string
  imageSrc: string
}

const ProfileEmptyBlock = ({ text, imageSrc }: ProfileEmptyBlockProps) => {
  return (
    <Stack alignItems="center">
      <Box sx={{ mt: '90px' }}>
        <Image src={imageSrc} alt={text} width={150} height={150} />
      </Box>
      <Typography
        variant="h3"
        color={theme => theme.palette.light2.main}
        sx={{ mt: '16px' }}
      >
        {text}
      </Typography>
    </Stack>
  )
}

export default ProfileEmptyBlock
