import React from 'react'
import { Stack } from '@mui/material'
import { CocktailPostDraftItem } from 'lib/domain/cocktail'
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
          key={draft.id}
          isDeleteMode={isDeleteMode}
          draft={draft}
          selected={selectedIds.includes(draft.id)}
          onCheck={checked => onCheck(draft.id, checked)}
        />
      ))}
    </Stack>
  )
}

export default DraftList
