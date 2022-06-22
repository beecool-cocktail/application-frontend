import { ShareOutlined } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import useShare from 'lib/application/ui/useShare'
import BackButton from '../button/backButton'

interface TopNavigationProps {
  title: string
}

const TopNavigation = ({ title }: TopNavigationProps) => {
  const share = useShare()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 16px'
      }}
    >
      <BackButton />
      <IconButton
        sx={{
          color: '#fff',
          padding: 0,
          width: 28,
          height: 28,
          backgroundColor: theme => theme.palette.light4.main
        }}
        onClick={() => share(title)}
      >
        <ShareOutlined />
      </IconButton>
    </Box>
  )
}

export default TopNavigation
