import BackButton from 'components/common/button/backButton'
import SubmitButton from 'components/common/button/submitButton'
import Header from 'components/layout/header'

interface SettingsHeaderProps {
  isValid: boolean
  isDirty: boolean
  onBack(isDirty: boolean): void
}

const SettingsHeader = ({ isValid, isDirty, onBack }: SettingsHeaderProps) => {
  return (
    <Header
      title="設定"
      leftButton={<BackButton onClick={() => onBack(isDirty)} />}
      rightButton={<SubmitButton disabled={!isValid || !isDirty} />}
    />
  )
}

export default SettingsHeader
