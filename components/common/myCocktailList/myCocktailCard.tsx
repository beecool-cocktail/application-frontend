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
import { MyCocktailItem } from 'lib/domain/cocktail'
import useMyCocktailCard from 'lib/application/cocktail/useMyCocktailCard'

export interface FavoriteCocktailCardProps {
  cocktail: MyCocktailItem
  editable?: boolean
  onDelete(id: number): void
}

const MyCocktailCard = ({
  cocktail,
  editable = false,
  onDelete
}: FavoriteCocktailCardProps) => {
  const {
    moreActionMenuOpen,
    moreActionMenuAnchorEl,
    handleClick,
    handleClickMoreAction,
    handleClose,
    handleEdit,
    handleDelete
  } = useMyCocktailCard(cocktail, onDelete)

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
        {editable && (
          <IconButton style={{ fontSize: 24 }} onClick={handleClickMoreAction}>
            <MoreHoriz />
          </IconButton>
        )}
      </Stack>
      {editable && (
        <Menu
          open={moreActionMenuOpen}
          anchorEl={moreActionMenuAnchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <MenuItem onClick={handleEdit}>編輯</MenuItem>
          <MenuItem onClick={handleDelete}>刪除</MenuItem>
        </Menu>
      )}
    </Stack>
  )
}

export default MyCocktailCard
