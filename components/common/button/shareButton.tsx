import useShare from 'lib/application/ui/useShare'
import ShareIcon from 'lib/assets/shareOutlined.svg'
import ShareBgIcon from 'lib/assets/shareGrayBgOutlined.svg'
import IconButton from './iconButton'
import ContainedIconButton from './containedIconButton'

export interface ShareButtonProps {
  contained?: boolean
  title: string
}

const ShareButton = ({ contained, title }: ShareButtonProps) => {
  const share = useShare()

  const handleClick = () => share(title)

  if (contained) {
    return (
      <ContainedIconButton size={28} onClick={handleClick}>
        <ShareBgIcon />
      </ContainedIconButton>
    )
  }

  return (
    <IconButton onClick={handleClick}>
      <ShareIcon />
    </IconButton>
  )
}

export default ShareButton
