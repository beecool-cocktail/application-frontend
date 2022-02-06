import BackButton from 'components/common/button/backButton'
import SubmitButton from 'components/common/button/submitButton'
import Header from 'components/layout/header'

const SettingsHeader = () => {
  return (
    <Header
      title="設定"
      leftButton={<BackButton />}
      rightButton={<SubmitButton />}
    />
  )
}

export default SettingsHeader
