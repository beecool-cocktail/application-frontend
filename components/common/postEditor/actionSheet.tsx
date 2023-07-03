import { useState } from 'react'
import { Box, Fab, Stack, Backdrop, ClickAwayListener } from '@mui/material'
import CancelIcon from 'lib/assets/cancelCloseOutlined.svg'
import MoreIcon from 'lib/assets/more.svg'
import IconButton from '../button/iconButton'

interface ActionSheetProps {
  topOffset: number
  actions: ActionButtonProps[]
}

interface ActionButtonProps {
  icon: React.ReactNode
  text: string
  onClick: () => void
}

interface MaskProps {
  open: boolean
}

const threeButtonsTop = [
  { left: 8, top: -82 },
  { left: -53, top: -59 },
  { left: -81, top: -6 }
]

const fourButtonsTop = [
  { left: 10, top: -79 },
  { left: -42, top: -71 },
  { left: -75, top: -29 },
  { left: -78, top: 25 }
]

const fourButtonsDown = [
  { left: -74, top: -31 },
  { left: -78, top: 21 },
  { left: -50, top: 64 },
  { left: 0, top: 84 }
]


const Mask = ({ open }: MaskProps) => {
  return (
    <Backdrop
      open={open}
      sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)', zIndex: (theme) => theme.zIndex.drawer - 1 }}
    >
    </Backdrop>
  )
}


const ActionButton = ({ icon, onClick }: ActionButtonProps) => {
  return (
    <Stack direction="row" alignItems="center" columnGap="4px">
      <Fab
        color="primary"
        sx={{
          width: 46,
          height: 46,
          fontSize: 24,
          color: theme => theme.palette.light1.main,
        }}
        onClick={onClick}
      >
        {icon}
      </Fab>
    </Stack>
  )
}

const ActionSheet = ({ topOffset, actions }: ActionSheetProps) => {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  // const [iconButtonRect, setIconButtonRect] = useState<DOMRect | undefined>(undefined)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(open ? null : event.currentTarget)
    // setIconButtonRect(event.currentTarget.getBoundingClientRect())
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const halfOfIconButtonWidth = 12
  const halfOfIconButtonHeight = 12

  let displacement: { top: number, left: number }[] = []

  switch (actions.length) {
    case 3:
      displacement = threeButtonsTop
      break
    case 4:
      displacement = topOffset < 230 ? fourButtonsDown : fourButtonsTop
      break
    default:
      break
  }

  return (
    <>

      <ClickAwayListener onClickAway={handleClose}>
        <Box sx={{
          zIndex: (theme) => theme.zIndex.drawer,
          position: 'relative'
        }}>
          <Box sx={{
            opacity: open ? 0 : 1,
          }}>
            <IconButton size={24} onClick={handleClick}>
              <MoreIcon />
            </IconButton>
          </Box>
          <Box sx={{
            transition: 'transform 400ms cubic-bezier(0.71, 0.84, 0.29, 1.37)',
            transform: open ? 'scale(1)' : 'scale(0)',
            position: 'absolute',
            left: 0,
            top: 0,
          }}>
            <IconButton size={24} onClick={handleClick}>
              <CancelIcon />
            </IconButton>
          </Box>
          {actions.map((action, index) => (
            <Box key={action.text}
              sx={{
                position: 'absolute',
                left: 0 - halfOfIconButtonWidth,
                top: 0 - halfOfIconButtonHeight,
                transition: open ? 'transform 400ms cubic-bezier(0.71, 0.84, 0.29, 1.37)' : 'transform 300ms ease-out',
                transform: open ? `translate(${displacement[index].left}px, ${displacement[index].top}px) scale(1)` : 'translate(0px, 0px) scale(0)',
                zIndex: (theme) => theme.zIndex.drawer,
              }}
            >
              <ActionButton {...action} />
            </Box>
          ))}
        </Box>
      </ClickAwayListener>

      <Mask open={open}></Mask>
    </>
  )
}

export default ActionSheet
