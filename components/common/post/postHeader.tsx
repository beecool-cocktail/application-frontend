import { BookmarkOutlined, ShareOutlined } from '@mui/icons-material'
import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import React from 'react'
import usePermission from 'lib/application/usePermission'
import useLoginDialog from 'lib/application/useLoginDialog'
import useShare from 'lib/application/useShare'

export type CocktailDetailsHeaderProps = {
  title: string
  userName: string
}

const CocktailDetailsHeader = ({
  title,
  userName
}: CocktailDetailsHeaderProps) => {
  const hasPermission = usePermission()
  const { setOpen: setLoginDialogOpen } = useLoginDialog()
  const share = useShare()

  const handleCollect = () => {
    if (hasPermission) return
    setLoginDialogOpen(true)
  }

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
        <Grid item xs="auto">
          <IconButton onClick={handleCollect}>
            <BookmarkOutlined />
          </IconButton>
        </Grid>
      </Grid>
      <Typography>{userName}</Typography>
    </Stack>
  )
}

export default CocktailDetailsHeader
