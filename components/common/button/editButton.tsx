import { IconButton } from '@mui/material'
import EditIcon from 'lib/assets/edit/topNav.svg'

export interface EditButtonProps {
  contained?: boolean
  onClick?(): void
}

const EditButton = ({ contained, onClick }: EditButtonProps) => {
  return (
    <IconButton
      sx={{
        width: 28,
        height: 28,
        padding: 0,
        backgroundColor: theme => {
          if (contained) return theme.palette.light4.main
        },
        color: '#fff',
        fontSize: 20
      }}
      onClick={onClick}
    >
      <EditIcon />
    </IconButton>
  )
}

export default EditButton
