import BackButton from 'components/common/button/backButton'
import SubmitButton from 'components/common/button/submitButton'
import Header from 'components/layout/header'

interface SettingsHeaderProps {
  isValid: boolean
  onBack?(): void
}

const SettingsHeader = ({ isValid, onBack }: SettingsHeaderProps) => {
  return (
    <Header
      title="設定"
      leftButton={<BackButton onClick={onBack} />}
      rightButton={<SubmitButton disabled={!isValid} />}
    />
  )
}

export default SettingsHeader
