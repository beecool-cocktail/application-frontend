import React from 'react'
import { ShareOutlined } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import Avatar from 'components/common/image/avatar'
import useShare from 'lib/application/ui/useShare'
import useCornerRouter from 'lib/application/useCornerRouter'

export type CocktailDetailsHeaderProps = {
  title: string
  userId: number
  userName: string
  userPhoto: string
}

const CocktailDetailsHeader = ({
  title,
  userId,
  userName,
  userPhoto
}: CocktailDetailsHeaderProps) => {
  const router = useCornerRouter()
  const share = useShare()

  const handleUserClick = () => router.gotoUserById(userId)

  return (
    <Stack>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs="auto" onClick={handleUserClick}>
          <Avatar src={userPhoto} size={32} onClick={handleUserClick}></Avatar>
        </Grid>
        <Grid item xs>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item xs="auto">
          <IconButton onClick={() => share(title)}>
            <ShareOutlined />
          </IconButton>
        </Grid>
      </Grid>
      <Typography onClick={handleUserClick}>{userName}</Typography>
    </Stack>
  )
}

export default CocktailDetailsHeader
