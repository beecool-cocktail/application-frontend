import BackButton from '../../common/button/backButton'
import SubmitButton from '../../common/button/submitButton'
import Header from '../../layout/header'

const SettingsHeader = () => {
  const handleSubmit = () => {
    console.log('submit')
  }

  return (
    <Header
      title="設定"
      leftButton={<BackButton />}
      rightButton={<SubmitButton onClick={handleSubmit} />}
    />
  )
}

export default SettingsHeader
