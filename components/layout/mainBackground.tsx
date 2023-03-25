import { ReactNode } from 'react'
import { Box } from '@mui/material'

interface MaxWidthContainerProps {
  children: ReactNode
}

const MainBackground = ({ children }: MaxWidthContainerProps) => (
  <Box bgcolor={theme => theme.palette.dark3.main}>{children}</Box>
)

export default MainBackground
