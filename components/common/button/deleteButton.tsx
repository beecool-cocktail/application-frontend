import { Box } from '@mui/material'
import TrashIcon from 'lib/assets/trashOutlined.svg'
import IconButton from './iconButton'

export interface DeleteButtonProps {
  isEditMode?: boolean
  onClick: () => void
}

const DeleteButton = ({
  isEditMode = false,
  onClick: handleClick
}: DeleteButtonProps) => {
  return (
    <Box
      borderRadius="50%"
      sx={{
        backgroundColor: theme =>
          isEditMode ? theme.palette.light4.main : 'transparent',
        boxShadow: isEditMode
          ? '0px 1.75px 2.91667px rgba(13, 13, 13, 0.2)'
          : 'none'
      }}
    >
      <IconButton onClick={handleClick}>
        <TrashIcon />
      </IconButton>
    </Box>
  )
}

export default DeleteButton
