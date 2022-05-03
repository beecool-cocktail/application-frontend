import { ShareOutlined } from '@mui/icons-material'
import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import React from 'react'
import useShare from 'lib/application/useShare'
import useCornerRouter from 'lib/application/useCornerRouter'

export type CocktailDetailsHeaderProps = {
  title: string
  userId: number
  userName: string
}

const CocktailDetailsHeader = ({
  title,
  userId,
  userName
}: CocktailDetailsHeaderProps) => {
  const router = useCornerRouter()
  const share = useShare()

  const handleUserClick = () => router.gotoUserById(userId)

  return (
    <Stack>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs="auto" onClick={handleUserClick}>
          <Avatar>U</Avatar>
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
