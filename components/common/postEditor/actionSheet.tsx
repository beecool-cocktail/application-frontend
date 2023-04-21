import { useState } from 'react'
import { Box, Fab, Stack, Typography, Backdrop, ClickAwayListener } from '@mui/material'
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

interface MaskProps {
  open: boolean
}

interface ActionButtonDisplacement {
  threeButtons: { top: number, left: number }[];
  fourButtons: { top: number, left: number }[];
}

const actionButtonDisplacement: ActionButtonDisplacement = {
  threeButtons: [
    { top: -67, left: -68 },
    { top: -107, left: -1 },
    { top: -67, left: 61 }
  ],
  fourButtons: [
    { top: -26, left: -87 },
    { top: -94, left: -41 },
    { top: -94, left: 41 },
    { top: -26, left: 87 }
  ]
}


const Mask = ({ open }: MaskProps) => {
  return (
    <Backdrop
      open={open}
      sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)', zIndex: (theme) => theme.zIndex.drawer - 1 }}
    >
    </Backdrop>
  )
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
          color: theme => theme.palette.light1.main,
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
  const [iconButtonRect, setIconButtonRect] = useState<DOMRect | undefined>(undefined)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(open ? null : event.currentTarget)
    setIconButtonRect(event.currentTarget.getBoundingClientRect())
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const iconButtonTop = iconButtonRect ? iconButtonRect.top : 0
  const iconButtonLeft = iconButtonRect ? iconButtonRect.left : 0

  let displacement: { top: number, left: number }[] = []

  if (actions.length === 3) {
    displacement = actionButtonDisplacement.threeButtons
  } else if (actions.length === 4) {
    displacement = actionButtonDisplacement.fourButtons
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <Box sx={{ zIndex: (theme) => theme.zIndex.drawer }}>
          <Box>
            <IconButton size={24} onClick={handleClick}>
              {open ? <CancelIcon /> : <MoreIcon />}
            </IconButton>
          </Box>
          {actions.map((action, index) => (
            <Box key={action.text}
              sx={{
                position: 'absolute',
                left: iconButtonLeft - 37,
                top: iconButtonTop - 11,
                transition: 'transform 300ms ease-out',
                transform: open ? `translate(${displacement[index].top}px, ${displacement[index].left}px) scale(1)` : 'translate(0px, 0px) scale(0)',
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
