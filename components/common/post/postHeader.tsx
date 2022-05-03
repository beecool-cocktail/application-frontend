import { ShareOutlined } from '@mui/icons-material'
import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import React from 'react'
import useShare from 'lib/application/useShare'

export type CocktailDetailsHeaderProps = {
  title: string
  userName: string
}

const CocktailDetailsHeader = ({
  title,
  userName
}: CocktailDetailsHeaderProps) => {
  const share = useShare()

  return (
    <Stack>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs="auto">
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
      <Typography>{userName}</Typography>
    </Stack>
  )
}

export default CocktailDetailsHeader
