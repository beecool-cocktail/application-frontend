import { IconButton } from '@mui/material'
import useShare from 'lib/application/ui/useShare'
import ShareIcon from 'lib/assets/shareOutlined.svg'

export interface ShareButtonProps {
  contained?: boolean
  title: string
}

const ShareButton = ({ contained, title }: ShareButtonProps) => {
  const share = useShare()

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
        fontSize: 24
      }}
      onClick={() => share(title)}
    >
      <ShareIcon />
    </IconButton>
  )
}

export default ShareButton
