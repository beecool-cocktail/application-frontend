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
import useFavoriteCocktailCard from 'lib/application/useFavoriteCocktailCard'

export interface FavoriteCocktailCardProps {
  cocktail: FavoriteCocktailItem
  onRemove(id: number): void
}

const FavoriteCocktailCard = ({
  cocktail,
  onRemove
}: FavoriteCocktailCardProps) => {
  const {
    moreActionMenuOpen,
    moreActionMenuAnchorEl,
    handleClick,
    handleClickMoreAction,
    handleClose,
    handleShare,
    handleRemove
  } = useFavoriteCocktailCard(cocktail, onRemove)

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
        open={moreActionMenuOpen}
        anchorEl={moreActionMenuAnchorEl}
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
