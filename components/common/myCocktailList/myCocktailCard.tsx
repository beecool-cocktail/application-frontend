import React from 'react'
import Image from 'next/image'
import { Box, Stack, Typography } from '@mui/material'
import { MyCocktailItem } from 'lib/domain/cocktail'
import useMyCocktailCard from 'lib/application/cocktail/useMyCocktailCard'
import MoreIcon from 'lib/assets/more.svg'
import CloseIcon from 'lib/assets/cancelClose.svg'
import IconButton from '../button/iconButton'
import ActionButton from './actionButton'

export interface FavoriteCocktailCardProps {
  cocktail: MyCocktailItem
  editable?: boolean
  onDelete(id: number): void
}

const MyCocktailCard = ({
  cocktail,
  // editable = false,
  onDelete
}: FavoriteCocktailCardProps) => {
  const {
    isEditMode,
    handleClick,
    handleClickMoreAction,
    // handleClose,
    handleEdit,
    handleDelete
  } = useMyCocktailCard(cocktail, onDelete)

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'relative',
        width: 1,
        height: 1,
        borderRadius: '6px',
        cursor: isEditMode ? 'normal' : 'pointer',
        overflow: 'hidden'
      }}
    >
      <Image
        style={{ borderRadius: '6px' }}
        layout="fill"
        src={cocktail.photoUrl}
        alt="favorite cocktail image"
        width={400}
        height={300}
      />
      {isEditMode && (
        <Stack
          sx={{
            position: 'absolute',
            alignItems: 'center',
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            background: 'rgba(0, 0, 0, 0.5)',
            '& > *': {
              mt: '20px'
            }
          }}
        >
          <ActionButton text="刪除貼文" onClick={handleDelete} />
          <ActionButton text="編輯貼文" onClick={handleEdit} />
        </Stack>
      )}
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'flex-end',
          width: 1,
          height: '45px',
          bottom: 0,
          left: 0,
          borderRadius: '6px',
          background:
            'radial-gradient(198.57% 198.57% at 50% 207.14%, rgba(0, 0, 0, 0.6) 60.51%, rgba(0, 0, 0, 0) 100%)'
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            p: '4px',
            pr: '8px'
          }}
        >
          <Typography
            variant="body3"
            sx={{
              width: 1,
              display: 'flex',
              alignItems: 'center',
              color: theme => theme.palette.brandWhite.main,
              background:
                'linear-gradient(90deg, #FFFFFF 42.53%, rgba(255, 255, 255, 0) 80%)',
              backgroundClip: 'text',
              textFillColor: 'transparent'
            }}
          >
            {cocktail.title}
          </Typography>
          <IconButton onClick={handleClickMoreAction}>
            {isEditMode ? <CloseIcon /> : <MoreIcon />}
          </IconButton>
        </Stack>
      </Box>
    </Box>
  )
}

export default MyCocktailCard
