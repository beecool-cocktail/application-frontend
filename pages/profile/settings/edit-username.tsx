import { Box, Stack, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import BasedTopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'
import Input from 'components/common/input/input'
import Close from 'lib/assets/cancelClose.svg'
import SubmitButton from 'components/common/button/submitButton'
import { CJKPattern } from 'lib/helper/string'
import useCurrentUser from 'lib/application/user/useCurrentUser'

interface UserNameContentProps {
  username: string
}

const UserNameContent = ({ username }: UserNameContentProps) => {
  const [input, setInput] = useState(username)
  const ref = useRef<HTMLInputElement>()
  const error = !CJKPattern.test(input)

  const handleCancel = () => {
    setInput('')
    ref.current?.focus()
  }

  const handleConfirm = () => {
    // TODO
  }

  return (
    <Stack spacing="44px">
      <BasedTopNavigation position="sticky" thresholdHeight={185}>
        {() => (
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 1,
              height: 1,
              px: '16px',
              backgroundColor: theme => theme.palette.dark3.main
            }}
          >
            <BackButton />
            <Typography variant="body1" color="light1">
              更改名稱
            </Typography>
            <SubmitButton
              onClick={handleConfirm}
              disabled={error || input === username}
            />
          </Stack>
        )}
      </BasedTopNavigation>
      <Box px="32px">
        <Input
          inputRef={ref}
          value={input}
          onChange={e => setInput(e.target.value)}
          // getLetterCount={getCharacterCount}
          error={error}
          fullWidth
          maxLength={20}
          feedback={error ? '名稱格式錯誤，建議使用中英文' : undefined}
          endAdornment={
            <Box sx={{ cursor: 'pointer' }} onClick={handleCancel}>
              <Close />
            </Box>
          }
        />
      </Box>
    </Stack>
  )
}

const EditUsername = () => {
  const { user, loading } = useCurrentUser()

  if (!user || loading) return null
  return <UserNameContent username={user.username} />
}

export default EditUsername
