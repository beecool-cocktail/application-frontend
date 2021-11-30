import { BookmarkOutlined, ShareOutlined } from '@mui/icons-material'
import {
  Avatar,
  Dialog,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material'
import { Box, Grid, Popper } from '@mui/material'
import React, { useRef, useState } from 'react'
import { Cocktail } from '../../types/cocktail'

const POPPER_TIMEOUT = 1000

export type CocktailDetailsHeaderProps = {
  cocktail: Cocktail
}

const CocktailDetailsHeader = ({ cocktail }: CocktailDetailsHeaderProps) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const timeoutIdRef = useRef<number | null>(null)

  const handleShare = async (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget)
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
    timeoutIdRef.current = window.setTimeout(() => {
      setAnchorEl(null)
    }, POPPER_TIMEOUT)

    if (!navigator.share) {
      navigator.clipboard.writeText(window.location.href)
      return
    }

    try {
      await navigator.share({
        url: window.location.href,
        title: document.title,
        text: cocktail.name
      })
    } catch (err) {
      console.error('share failed:', err)
    }
  }

  const handleCollect = () => {
    setLoginDialogOpen(true)
  }

  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs="auto">
          <Avatar>U</Avatar>
        </Grid>
        <Grid item xs>
          <Typography variant="h5">{cocktail.name}</Typography>
        </Grid>
        <Grid item xs="auto">
          <IconButton onClick={handleShare}>
            <ShareOutlined />
          </IconButton>
          <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
              Content Copied
            </Box>
          </Popper>
        </Grid>
        <Grid item xs="auto">
          <IconButton onClick={handleCollect}>
            <BookmarkOutlined />
          </IconButton>
        </Grid>
      </Grid>
      <Dialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)}>
        <DialogTitle>Sign in with Google</DialogTitle>
      </Dialog>
    </>
  )
}

export default CocktailDetailsHeader
