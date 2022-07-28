import React from 'react'
import Image from 'next/image'
import { Stack, Typography } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import useCornerRouter from 'lib/application/useCornerRouter'
import { CocktailPostDraftItem } from 'lib/domain/cocktail'
import { pathname, getUrlById } from 'lib/configs/routes'
import IconButton from 'components/common/button/iconButton'
import Checkbox from 'components/common/input/checkbox'

export interface DraftCardProps {
  isEditMode: boolean
  selected: boolean
  draft: CocktailPostDraftItem
  onCheck(checked: boolean): void
}

const DraftCard = ({
  draft,
  selected,
  isEditMode,
  onCheck
}: DraftCardProps) => {
  const router = useCornerRouter()

  const handleClick = () => {
    if (!isEditMode)
      return router.push(getUrlById(pathname.draftById, draft.id))
    onCheck(!selected)
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap="12px"
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        position: 'relative',
        width: 1,
        height: 77,
        borderRadius: '6px',
        px: '8px',
        bgcolor: theme => theme.palette.dark5.main
      }}
    >
      {isEditMode && <Checkbox checked={selected} />}
      <Stack
        flex={1}
        direction="row"
        alignItems="flex-start"
        sx={{ minWidth: 0 }}
      >
        <Image
          layout="fixed"
          width={80}
          height={60}
          src={draft.coverPhotoUrl}
          alt={draft.title}
          style={{ borderRadius: '4px' }}
        />
        <Stack
          flex={1}
          alignItems="flex-start"
          justifyContent={draft.description ? 'flex-start' : 'center'}
          rowGap="6px"
          sx={{ ml: '8px', alignSelf: 'stretch', minWidth: 0 }}
        >
          <Typography
            variant="body1"
            color={theme => theme.palette.light1.main}
            sx={{
              width: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {draft.title}
          </Typography>
          {draft.description && (
            <Typography
              variant="body3"
              color={theme => theme.palette.light4.main}
              sx={{
                width: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {draft.description}
            </Typography>
          )}
        </Stack>
      </Stack>
      {!isEditMode && (
        <IconButton>
          <ArrowForwardIos />
        </IconButton>
      )}
    </Stack>
  )
}

export default DraftCard
