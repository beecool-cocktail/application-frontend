import Image from 'next/image'
import { Stack } from '@mui/material'
import Button from 'components/common/button/button'
import { CocktailPostDraftItem } from 'lib/domain/cocktail'
import useCornerRouter from 'lib/application/useCornerRouter'
import { paths } from 'lib/configs/routes'
import DraftCard from './draftCard'

export interface DraftListProps {
  isEditMode: boolean
  selectedIds: number[]
  drafts: CocktailPostDraftItem[]
  onCheck(id: number, checked: boolean): void
}

const DraftList = ({
  drafts,
  selectedIds,
  isEditMode,
  onCheck
}: DraftListProps) => {
  const router = useCornerRouter()
  const gotoCreatePost = () => router.push(paths.createPost)

  if (!drafts.length) {
    return (
      <Stack
        flex={1}
        width={1}
        padding={2}
        alignItems="center"
        justifyContent="center"
        gap="28px"
        pt="177px"
      >
        <Image
          src="/draft.png"
          alt="draft"
          layout="fixed"
          width={128}
          height={128}
        />
        <Button onClick={gotoCreatePost}>快去發文</Button>
      </Stack>
    )
  }

  return (
    <Stack width={1} gap="12px">
      {drafts.map(draft => (
        <DraftCard
          key={draft.id}
          isEditMode={isEditMode}
          draft={draft}
          selected={selectedIds.includes(draft.id)}
          onCheck={checked => onCheck(draft.id, checked)}
        />
      ))}
    </Stack>
  )
}

export default DraftList
