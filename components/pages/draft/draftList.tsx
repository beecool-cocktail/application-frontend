import React from 'react'
import { Stack } from '@mui/material'
import { CocktailPostDraft } from 'lib/types/cocktail'
import DraftItem from './draftItem'

export interface DraftListProps {
  drafts: CocktailPostDraft[]
}

const DraftList = ({ drafts }: DraftListProps) => {
  return (
    <Stack width={1}>
      {drafts.map(draft => (
        <DraftItem key={draft.id} draft={draft} />
      ))}
    </Stack>
  )
}

export default DraftList
