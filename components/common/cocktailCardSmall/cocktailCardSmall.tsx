import React, { useState } from 'react'
import Image from 'next/image'
import { Box, Stack, Typography, ClickAwayListener } from '@mui/material'
import { ProfileCocktailItem } from 'lib/domain/cocktail'
import MoreIcon from 'lib/assets/more.svg'
import CloseIcon from 'lib/assets/cancelClose.svg'
import IconButton from '../button/iconButton'
import ActionButton from '../myCocktailList/actionButton'

interface CardAction {
  text: string
  onClick: (cocktail: ProfileCocktailItem) => void
}

export interface FavoriteCocktailCardProps {
  cocktail: ProfileCocktailItem
  onClick(id: number): void
  actions: CardAction[]
  defaultEditMode?: boolean
}

const CocktailCardSmall = ({
  cocktail,
  onClick,
  actions,
  defaultEditMode = false
}: FavoriteCocktailCardProps) => {
  const [isEditMode, setEditMode] = useState(defaultEditMode)

  const handleClose = () => {
    setEditMode(false)
  }

  const handleClickMoreAction = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setEditMode(editMode => !editMode)
  }

  const handleCardClick = () => {
    onClick(cocktail.id)
  }

  const buttonActions = actions.map(action => ({
    ...action,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      handleClose()
      action.onClick(cocktail)
    }
  }))

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          position: 'relative',
          width: 1,
          height: 1,
          borderRadius: '6px',
          cursor: isEditMode ? 'normal' : 'pointer',
          overflow: 'hidden'
        }}
        onClick={handleCardClick}
      >
        <Image
          fill
          src={cocktail.photoUrl}
          alt="favorite cocktail image"
          style={{ objectFit: 'cover', borderRadius: '6px' }}
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
            {buttonActions.map(({ text, onClick }) => (
              <ActionButton key={text} text={text} onClick={onClick} />
            ))}
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
                overflow: 'hidden',
                whiteSpace: 'nowrap',
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
    </ClickAwayListener>
  )
}

export default CocktailCardSmall
