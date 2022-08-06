import Image from 'next/image'
import { Box, Stack, StackProps } from '@mui/material'
import { range } from 'ramda'
import Button from 'components/common/button/button'
import { CocktailPostDraftItem } from 'lib/domain/cocktail'
import useCornerRouter from 'lib/application/useCornerRouter'
import { paths } from 'lib/configs/routes'
import DraftCard from './draftCard'
import DraftCardSkeleton from './draftCardSkeleton'

export interface DraftListProps {
  loading: boolean
  drafts: CocktailPostDraftItem[]
  isEditMode: boolean
  selectedIds: number[]
  onCheck(id: number, checked: boolean): void
}

const DraftCardContainer = ({ children }: StackProps) => (
  <Stack width={1} gap="12px" position="relative">
    {children}
  </Stack>
)

const DraftList = ({
  drafts,
  loading,
  selectedIds,
  isEditMode,
  onCheck
}: DraftListProps) => {
  const router = useCornerRouter()
  const gotoCreatePost = () => router.push(paths.createPost)

  if (loading) {
    return (
      <DraftCardContainer>
        {range(0, 6).map(index => (
          <DraftCardSkeleton key={index} />
        ))}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: 1,
            height: 169,
            background:
              'radial-gradient(384.91% 384.91% at 50.16% 393.48%, #141414 81.59%, rgba(0, 0, 0, 0) 100%)'
          }}
        ></Box>
      </DraftCardContainer>
    )
  }

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
    <DraftCardContainer>
      {drafts.map(draft => (
        <DraftCard
          key={draft.id}
          isEditMode={isEditMode}
          draft={draft}
          selected={selectedIds.includes(draft.id)}
          onCheck={checked => onCheck(draft.id, checked)}
        />
      ))}
    </DraftCardContainer>
  )
}

export default DraftList
