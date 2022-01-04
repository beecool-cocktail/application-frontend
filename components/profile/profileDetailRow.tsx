import { Stack, Typography } from '@mui/material'

export interface ProfileDetailRowProps {
  userId: string
  userName: string
  postCount: number
  collectionCount: number
}

const ProfileDetailRow = ({
  userId,
  userName,
  postCount,
  collectionCount
}: ProfileDetailRowProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body1">{`${userName}#${userId}`}</Typography>
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
