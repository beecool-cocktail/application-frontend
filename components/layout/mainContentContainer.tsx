import { ReactNode } from 'react'
import { Container } from '@mui/material'

interface MaxWidthContainerProps {
  children: ReactNode
}

const MainContentContainer = ({ children }: MaxWidthContainerProps) => (
  <Container maxWidth="sm" disableGutters={true} sx={{ width: 1, height: 1 }}>
    {children}
  </Container>
)

export default MainContentContainer
