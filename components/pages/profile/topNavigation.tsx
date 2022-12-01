import BasedTopNavigation from 'components/layout/topNavigation'
import SettingIcon from 'lib/assets/setting.svg'
import DraftIcon from 'lib/assets/draftOutlined.svg'
import { paths } from 'lib/configs/routes'
import useCornerRouter from 'lib/application/useCornerRouter'
import IconButton from 'components/common/button/iconButton'
import BackButton from 'components/common/button/backButton'

interface TopNavigationProps {
  isVisitor: boolean
}

const TopNavigation = ({ isVisitor }: TopNavigationProps) => {
  const router = useCornerRouter()

  return (
    <BasedTopNavigation
      position="sticky"
      thresholdHeight={185}
      leftSlot={() => isVisitor && <BackButton />}
      rightSlot={() => {
        if (isVisitor) return null
        return (
          <>
            <IconButton onClick={() => router.push(paths.drafts)}>
              <DraftIcon />
            </IconButton>
            <IconButton onClick={() => router.push(paths.settings)}>
              <SettingIcon />
            </IconButton>
          </>
        )
      }}
    />
  )
}

export default TopNavigation
