import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { IconButton, Checkbox, Stack, Typography } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import { CocktailPostDraftItem } from 'lib/types/cocktail'
import { paths, getUrlById } from 'lib/configs/routes'

export interface DraftItemProps {
  isDeleteMode: boolean
  selected: boolean
  draft: CocktailPostDraftItem
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

  const handleClick = () => {
    if (!isDeleteMode)
      return router.push(getUrlById(paths.draftById, draft.cocktail_id))
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
          src={draft.photo}
          alt={draft.title}
        />
        <Typography>{draft.title}</Typography>
      </Stack>
      <IconButton>
        <ArrowForwardIos />
      </IconButton>
    </Stack>
  )
}

export default DraftItem
