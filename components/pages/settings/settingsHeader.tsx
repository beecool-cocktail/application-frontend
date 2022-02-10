import BackButton from 'components/common/button/backButton'
import SubmitButton from 'components/common/button/submitButton'
import Header from 'components/layout/header'

interface SettingsHeaderProps {
  onBack?(): void
}

const SettingsHeader = ({ onBack }: SettingsHeaderProps) => {
  return (
    <Header
      title="設定"
      leftButton={<BackButton onBack={onBack} />}
      rightButton={<SubmitButton />}
    />
  )
}

export default SettingsHeader
