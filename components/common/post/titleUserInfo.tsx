import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Avatar from 'components/common/image/avatar'
import useCornerRouter from 'lib/application/useCornerRouter'

export type CocktailDetailsHeaderProps = {
  title: string
  userId: number
  userName: string
  userPhoto: string
}

const TitleUserInfo = ({
  title,
  userId,
  userName,
  userPhoto
}: CocktailDetailsHeaderProps) => {
  const router = useCornerRouter()

  const handleUserClick = () => router.gotoUserById(userId)

  return (
    <Stack alignItems="flex-start" spacing="16px">
      <Typography variant="h2">{title}</Typography>
      <Stack direction="row" spacing="8px">
        <Box p="3px">
          <Avatar src={userPhoto} size={30} onClick={handleUserClick}></Avatar>
        </Box>
        <Stack>
          <Typography
            variant="body3"
            sx={{ color: theme => theme.palette.light2.main }}
            onClick={handleUserClick}
          >
            {userName}
          </Typography>
          <Typography
            variant="body4"
            sx={{ color: theme => theme.palette.light4.main }}
            onClick={handleUserClick}
          >
            #{userId}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default TitleUserInfo
