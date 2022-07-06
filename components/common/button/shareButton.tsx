import { IconButton } from '@mui/material'
import useShare from 'lib/application/ui/useShare'
import BackIcon from 'lib/assets/share/topNav/default.svg'

export interface ShareButtonProps {
  contained?: boolean
  title: string
}

const ShareButton = ({ contained, title }: ShareButtonProps) => {
  const share = useShare()

  return (
    <IconButton
      sx={{
        width: 30,
        height: 30,
        padding: 0,
        backgroundColor: theme => {
          if (contained) return theme.palette.light4.main
        },
        color: '#fff',
        fontSize: 24
      }}
      onClick={() => share(title)}
    >
      <BackIcon />
    </IconButton>
  )
}

export default ShareButton
