import { Box } from '@mui/material'
import errorIllustration from 'public/illustrations/meme_sthWrong.png'
import BottomButton from '../button/bottomButton'
import IllustrationWithText from '../image/illustrationWithText'

interface ErrorRetryProps {
  onRetry?(): void
}

const ErrorRetry = ({ onRetry }: ErrorRetryProps) => {
  return (
    <>
      <Box sx={{ mt: '143px' }}>
        <IllustrationWithText
          textFirst
          imgSrc={errorIllustration}
          text="讀取資料出錯"
        />
      </Box>
      <BottomButton position="fixed" onClick={onRetry}>
        重新整理
      </BottomButton>
    </>
  )
}

export default ErrorRetry
