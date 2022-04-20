import React from 'react'
import Image from 'next/image'
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem
} from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { FavoriteCocktailItem } from 'lib/domain/cocktail'
import useCornerRouter from 'lib/hooks/useCornerRouter'
import useConfirmDialog from 'lib/application/useConfirmDialog'
import useShare from 'lib/application/useShare'

export interface FavoriteCocktailCardProps {
  cocktail: FavoriteCocktailItem
  onRemove(id: number): void
}

const FavoriteCocktailCard = ({
  cocktail,
  onRemove
}: FavoriteCocktailCardProps) => {
  const router = useCornerRouter()
  const share = useShare()
  const confirmDialog = useConfirmDialog()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = () => {
    router.gotoCocktailDetails(cocktail.id)
  }

  const handleClickMoreAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(null)
  }

  const handleRemove = (e: React.MouseEvent) => {
    handleClose(e)
    confirmDialog.open({
      title: '取消收藏',
      content: '確定取消收藏此發文， 一旦取消收藏將無法復原？',
      onConfirm: () => {
        onRemove(cocktail.id)
        confirmDialog.destroy()
      },
      onCancel: () => confirmDialog.destroy()
    })
  }

  const handleShare = (e: React.MouseEvent) => {
    handleClose(e)
    share(
      cocktail.title,
      new URL(`/cocktails/${cocktail.id}`, window.location.origin).href
    )
  }

  const open = Boolean(anchorEl)

  return (
    <Stack p={1} onClick={handleClick}>
      <Box position="relative">
        <Image
          layout="responsive"
          src={cocktail.photoUrl}
          alt="favorite cocktail image"
          width={400}
          height={300}
        />
      </Box>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography>{cocktail.title}</Typography>
          <Typography>{cocktail.userName}</Typography>
        </Stack>
        <IconButton style={{ fontSize: 24 }} onClick={handleClickMoreAction}>
          <MoreHoriz />
        </IconButton>
      </Stack>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <MenuItem onClick={handleShare}>分享</MenuItem>
        <MenuItem onClick={handleRemove}>取消收藏</MenuItem>
      </Menu>
    </Stack>
  )
}

export default FavoriteCocktailCard
