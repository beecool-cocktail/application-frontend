import { ReactNode } from 'react'
import { Box } from '@mui/material'

interface MaxWidthContainerProps {
  children: ReactNode
  maxWidth: string | number
}

const MaxWidthContainer = ({ children, maxWidth }: MaxWidthContainerProps) => (
  <Box maxWidth={maxWidth} margin="0 auto">
    {children}
  </Box>
)

export default MaxWidthContainer
