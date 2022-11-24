import { Box } from '@mui/material'
import Button, { ButtonProps } from 'components/common/button/button'

const ScrollToButton = (props: ButtonProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        width: 1,
        px: '40px',
        py: '40px',
        background: theme =>
          `linear-gradient(180deg, rgba(20, 20, 20, 0) 0%, ${theme.palette.dark3.main} 71.87%)`
      }}
    >
      <Button sx={{ width: 1 }} {...props} />
    </Box>
  )
}

export default ScrollToButton
