import { Stack, Typography } from '@mui/material'
import Spinner from 'components/common/status/spinner'
import useUser from 'lib/application/useUser'

const ProfileDetailRow = () => {
  const { user, loading, error } = useUser()

  if (loading) return <Spinner />
  if (!user || error) return <Typography>error</Typography>
  const { id, username, collectionCount, postCount } = user

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body1">{`${username}#${id}`}</Typography>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="body2">發文數 {postCount}</Typography>
        <Typography variant="body2">收藏數 {collectionCount}</Typography>
      </Stack>
    </Stack>
  )
}

export default ProfileDetailRow
