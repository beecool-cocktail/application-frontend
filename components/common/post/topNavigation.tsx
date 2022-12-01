import BasedTopNavigation, { NAV_HEIGHT } from 'components/layout/topNavigation'
import BackButton from '../button/backButton'
import ShareButton from '../button/shareButton'
import EditButton from '../button/editButton'

interface PostTopNavigationProps {
  title: string
  editable: boolean
  onEdit?(): void
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
