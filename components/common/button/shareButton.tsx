import useShare from 'lib/application/ui/useShare'
import ShareIcon from 'lib/assets/shareOutlined.svg'
import IconButton from './iconButton'

export interface ShareButtonProps {
  contained?: boolean
  title: string
}

const ShareButton = ({ contained, title }: ShareButtonProps) => {
  const share = useShare()

  return (
    <IconButton contained={contained} onClick={() => share(title)}>
      <ShareIcon />
    </IconButton>
  )
}

export default ShareButton
