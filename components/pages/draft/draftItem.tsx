import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IconButton, Checkbox, Stack, Typography } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import { CocktailPostDraft } from 'lib/types/cocktail'
import { paths, getUrlById } from 'lib/configs/routes'
import { FALLBACK_URL } from 'lib/constants/image'

export interface DraftItemProps {
  isDeleteMode: boolean
  selected: boolean
  draft: CocktailPostDraft
  onCheck(checked: boolean): void
}

const WIDTH = 75
const RATIO = 3 / 4
const HEIGHT = WIDTH * RATIO

const DraftItem = ({
  draft,
  selected,
  isDeleteMode,
  onCheck
}: DraftItemProps) => {
  const router = useRouter()
  const { title, photos } = draft
  const coverPhotoUrl = photos[0] || ''

  const handleClick = () => {
    if (!isDeleteMode) return router.push(getUrlById(paths.draftById, draft.id))
    onCheck(!selected)
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
        columnGap={2}
      >
        {isDeleteMode && <Checkbox checked={selected} />}
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
