import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Avatar from 'components/common/image/avatar'
import useCornerRouter from 'lib/application/useCornerRouter'
import { paths } from 'lib/configs/routes'
import { getUserIdDisplay } from 'lib/domain/user'

export type CocktailDetailsHeaderProps = {
  title: string
  userId: number
  userName: string
  userPhoto: string
  isPreview: boolean
}

const TitleUserInfo = ({
  title,
  userId,
  userName,
  userPhoto,
  isPreview
}: CocktailDetailsHeaderProps) => {
  const router = useCornerRouter()

  const handleUserClick = () => router.push(paths.userById(userId))

  return (
    <Stack alignItems="flex-start" spacing="16px">
      <Typography
        variant="h2"
        sx={{ color: theme => theme.palette.light1.main }}
      >
        {title}
      </Typography>
      <Stack direction="row" spacing="8px">
        <Box p="3px">
          <Avatar
            size={30}
            src={userPhoto}
            onClick={isPreview ? undefined : handleUserClick}
          ></Avatar>
        </Box>
        <Stack>
          <Typography
            variant="body3"
            sx={{
              color: theme => theme.palette.light2.main,
              cursor: isPreview ? 'default' : 'pointer'
            }}
            onClick={isPreview ? undefined : handleUserClick}
          >
            {userName}
          </Typography>
          <Typography
            variant="body4"
            sx={{
              color: theme => theme.palette.light4.main,
              cursor: isPreview ? 'default' : 'pointer'
            }}
            onClick={isPreview ? undefined : handleUserClick}
          >
            {getUserIdDisplay(userId)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default TitleUserInfo
