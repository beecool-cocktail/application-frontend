import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IconButton, Stack, Typography } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import { CocktailPostDraft } from 'lib/types/cocktail'
import { paths, getUrlById } from 'lib/configs/routes'
import { FALLBACK_URL } from 'lib/constants/image'

export interface DraftItemProps {
  draft: CocktailPostDraft
}

const WIDTH = 75
const RATIO = 3 / 4
const HEIGHT = WIDTH * RATIO

const DraftItem = ({ draft }: DraftItemProps) => {
  const router = useRouter()
  const { title, photos } = draft
  const coverPhotoUrl = photos[0] || ''

  const handleClick = () => {
    router.push(getUrlById(paths.draftById, draft.id))
  }

  return (
    <Stack
      px={1}
      direction="row"
      height={100}
      alignItems="center"
      justifyContent="space-between"
      width={1}
      borderBottom="1px solid #ccc"
      onClick={handleClick}
      sx={{ cursor: 'pointer' }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={2}
      >
        <Image
          layout="fixed"
          width={WIDTH}
          height={HEIGHT}
          src={coverPhotoUrl || FALLBACK_URL}
          alt={title}
        />
        <Typography>{title}</Typography>
      </Stack>
      <IconButton>
        <ArrowForwardIos />
      </IconButton>
    </Stack>
  )
}

export default DraftItem
