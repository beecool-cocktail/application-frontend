import { useState } from 'react'
import { Box, Fab, Popover, Stack, Typography } from '@mui/material'
import CancelIcon from 'lib/assets/cancelCloseOutlined.svg'
import MoreIcon from 'lib/assets/more.svg'
import IconButton from '../button/iconButton'

interface ActionSheetProps {
  actions: ActionButtonProps[]
}

interface ActionButtonProps {
  icon: React.ReactNode
  text: string
  onClick: () => void
}

const ActionButton = ({ icon, text, onClick }: ActionButtonProps) => {
  return (
    <Stack direction="row" alignItems="center" columnGap="4px">
      <Typography variant="body3">{text}</Typography>
      <Fab
        color="primary"
        sx={{
          width: 46,
          height: 46,
          fontSize: 24,
          color: theme => theme.palette.light1.main
        }}
        onClick={onClick}
      >
        {icon}
      </Fab>
    </Stack>
  )
}

const ActionSheet = ({ actions }: ActionSheetProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <IconButton size={24} onClick={handleClick}>
        {open ? <CancelIcon /> : <MoreIcon />}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        sx={{ bgcolor: 'transparent' }}
      >
        <Box sx={{ width: 200, height: 200, position: 'relative' }}>
          {actions.map(action => {
            return <ActionButton key={action.text} {...action} />
          })}
        </Box>
      </Popover>
    </>
  )
}

export default ActionSheet
