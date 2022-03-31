import React from 'react'
import { Stack } from '@mui/material'
import { CocktailPostDraftItem } from 'lib/types/cocktail'
import DraftItem from './draftItem'

export interface DraftListProps {
  isDeleteMode: boolean
  selectedIds: number[]
  drafts: CocktailPostDraftItem[]
  onCheck(id: number, checked: boolean): void
}

const DraftList = ({
  drafts,
  selectedIds,
  isDeleteMode,
  onCheck
}: DraftListProps) => {
  return (
    <Stack width={1}>
      {drafts.map(draft => (
        <DraftItem
          key={draft.cocktail_id}
          isDeleteMode={isDeleteMode}
          draft={draft}
          selected={selectedIds.includes(draft.cocktail_id)}
          onCheck={checked => onCheck(draft.cocktail_id, checked)}
        />
      ))}
    </Stack>
  )
}

export default DraftList
