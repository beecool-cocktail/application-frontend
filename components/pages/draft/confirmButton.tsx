import { Box } from '@mui/material'
import Button from 'components/common/button/button'

interface ConfirmButtonProps {
  selectedCount: number
  onClick(): void
}

const ConfirmButton = ({ selectedCount, onClick }: ConfirmButtonProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        width: 1,
        height: 135,
        px: '40px',
        pt: '30px',
        background:
          'linear-gradient(180deg, rgba(20, 20, 20, 0) 0%, #141414 71.87%)'
      }}
    >
      <Button
        sx={{ width: 1 }}
        disabled={selectedCount === 0}
        onClick={onClick}
      >{`確認刪除(${selectedCount})`}</Button>
    </Box>
  )
}

export default ConfirmButton
