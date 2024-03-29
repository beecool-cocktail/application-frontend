import { useEffect, useState } from 'react'
import { Box, Fab, Stack, Backdrop, ClickAwayListener } from '@mui/material'
import CancelIcon from 'lib/assets/cancelCloseOutlined.svg'
import MoreIcon from 'lib/assets/more.svg'
import IconButton from '../button/iconButton'

interface ActionSheetProps {
  topOffset: number
  actions: ActionButtonProps[]
}

export interface ActionButtonProps {
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
      sx={{
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        zIndex: theme => theme.zIndex.modal
      }}
    ></Backdrop>
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
          color: theme => theme.palette.light1.main
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(open ? null : event.currentTarget)
    document.documentElement.style.overflow = open ? 'auto' : 'hidden'
  }

  const handleClose = () => {
    setAnchorEl(null)
    document.documentElement.style.overflow = 'auto'
  }

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

  const open = Boolean(anchorEl)

  const halfOfIconButtonWidth = 12
  const halfOfIconButtonHeight = 12

  const buttonDisplacements: { [key: number]: { top: number; left: number }[] } = {
    3: threeButtonsTop,
    4: topOffset < 230 ? fourButtonsDown : fourButtonsTop,
  }

  const actionButtons = actions.map((action, index) => (
    <Box
      key={action.text}
      sx={{
        position: 'absolute',
        left: 0 - halfOfIconButtonWidth,
        top: 0 - halfOfIconButtonHeight,
        transition: open
          ? 'transform 400ms cubic-bezier(0.71, 0.84, 0.29, 1.37)'
          : 'transform 300ms ease-out',
        transform: open
          ? `translate(${buttonDisplacements[actions.length][index].left}px,
            ${buttonDisplacements[actions.length][index].top}px) scale(1)`
          : 'translate(0px, 0px) scale(0)',
        zIndex: theme => theme.zIndex.modal,
      }}
    >
      <ActionButton
        {...action}
        onClick={() => {
          action.onClick()
          handleClose()
        }}
      />
    </Box>
  ))

  return (
    <>
      <Mask open={open}></Mask>
      <ClickAwayListener onClickAway={handleClose}>
        <Box
          sx={{
            position: 'relative'
          }}
        >
          <Box
            sx={{
              opacity: open ? 0 : 1
            }}
          >
            <IconButton onClick={handleClick}>
              <MoreIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              transition:
                'transform 400ms cubic-bezier(0.71, 0.84, 0.29, 1.37)',
              transform: open ? 'scale(1)' : 'scale(0)',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: theme => theme.zIndex.modal,
            }}
          >
            <IconButton onClick={handleClick}>
              <CancelIcon />
            </IconButton>
          </Box>
          {actionButtons}
        </Box>
      </ClickAwayListener>
    </>
  )
}

export default ActionSheet
