import { Box } from '@mui/material'
import AnimationToggleIcon from '../animationToggleIcon'

export interface CheckboxProps {
  checked: boolean
  onClick?: () => void
}

const Checkbox = ({ checked, onClick }: CheckboxProps) => {
  return (
    <Box sx={{ cursor: 'pointer' }} onClick={onClick}>
      <AnimationToggleIcon artboard="Checkbox" active={checked} />
    </Box>
  )
}

export default Checkbox
