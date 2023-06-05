import BasedTopNavigation, { NAV_HEIGHT } from 'components/layout/topNavigation'
import EditIcon from 'lib/assets/editOutlined.svg'
import EditBgIcon from 'lib/assets/editGrayBgOutlined.svg'
import BackButton from '../button/backButton'
import ShareButton from '../button/shareButton'
import IconButton from '../button/iconButton'
import ContainedIconButton from '../button/containedIconButton'

interface PostTopNavigationProps {
  title: string
  editable: boolean
  onEdit?(): void
}

const EditButton = ({
  contained,
  onClick
}: {
  contained?: boolean
  onClick?: () => void
}) => {
  if (contained) {
    return (
      <ContainedIconButton onClick={onClick}>
        <EditBgIcon />
      </ContainedIconButton>
    )
  }

  return (
    <IconButton onClick={onClick}>
      <EditIcon />
    </IconButton>
  )
}

const PostTopNavigation = ({
  title,
  editable,
  onEdit
}: PostTopNavigationProps) => {
  const ratio = 3 / 4
  const swiperHeight = window.innerWidth * ratio
  const thresholdHeight = swiperHeight - NAV_HEIGHT

  return (
    <BasedTopNavigation
      position="fixed"
      thresholdHeight={thresholdHeight}
      leftSlot={concrete => <BackButton contained={!concrete} />}
      rightSlot={concrete => (
        <>
          <ShareButton title={title} contained={!concrete} />
          {editable && <EditButton contained={!concrete} onClick={onEdit} />}
        </>
      )}
    />
  )
}

export default PostTopNavigation
