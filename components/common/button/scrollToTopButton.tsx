import { Box, Fab } from '@mui/material'
import { AiOutlineArrowUp } from 'react-icons/ai'

const ScrollToTopButton = () => {
  const handleClick = () =>
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

  return (
    <Box position="fixed" right={10} bottom={72}>
      <Fab color="primary" onClick={handleClick}>
        <AiOutlineArrowUp size={24} />
      </Fab>
    </Box>
  )
}

export default ScrollToTopButton
