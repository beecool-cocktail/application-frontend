import { Stack, Typography } from '@mui/material'
import Spinner from 'components/common/status/spinner'
import useUserInfo from 'lib/hooks/useUserInfo'

const ProfileDetailRow = () => {
  const { userInfo, loading, error } = useUserInfo()

  if (loading) return <Spinner />
  if (!userInfo || error) return <Typography>error</Typography>
  const { user_id, user_name, number_of_collection, number_of_post } = userInfo

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body1">{`${user_name}#${user_id}`}</Typography>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="body2">發文數 {number_of_post}</Typography>
        <Typography variant="body2">收藏數 {number_of_collection}</Typography>
      </Stack>
    </Stack>
  )
}

export default ProfileDetailRow
