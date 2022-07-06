import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

interface DescriptionProps {
  content: string
}

const Description = ({ content }: DescriptionProps) => {
  return (
    <Box mt="12px">
      <Typography
        variant="body2"
        sx={{ color: theme => theme.palette.light2.main }}
      >
        {content}
      </Typography>
    </Box>
  )
}

export default Description
