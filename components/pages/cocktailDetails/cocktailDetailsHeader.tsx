import { BookmarkOutlined, ShareOutlined } from '@mui/icons-material'
import { Avatar, IconButton, Typography } from '@mui/material'
import { Box, Grid, Popper } from '@mui/material'
import React, { useRef, useState } from 'react'
import { Cocktail } from 'types/cocktail'
import LoginDialog from 'components/common/dialog/loginDialog'
import usePermission from 'hooks/usePermission'

const POPPER_TIMEOUT = 1000

export type CocktailDetailsHeaderProps = {
  cocktail: Cocktail
}

const CocktailDetailsHeader = ({ cocktail }: CocktailDetailsHeaderProps) => {
  const hasPermission = usePermission()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const PopperTimeoutIdRef = useRef<number | null>(null)

  const handleShare = async (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget)

    if (PopperTimeoutIdRef.current) clearTimeout(PopperTimeoutIdRef.current)
    if (!navigator.share) {
      navigator.clipboard.writeText(window.location.href)
      PopperTimeoutIdRef.current = window.setTimeout(() => {
        setAnchorEl(null)
      }, POPPER_TIMEOUT)
      return
    }
    try {
      await navigator.share({
        url: window.location.href,
        title: document.title,
        text: cocktail.title
      })
    } catch (err) {
      console.error('share failed:', err)
    }
  }

  const handleCollect = () => {
    if (hasPermission) return
    setLoginDialogOpen(true)
  }

  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs="auto">
          <Avatar>U</Avatar>
        </Grid>
        <Grid item xs>
          <Typography variant="h5">{cocktail.title}</Typography>
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
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </>
  )
}

export default CocktailDetailsHeader
