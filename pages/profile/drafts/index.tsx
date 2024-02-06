import Head from 'next/head'
import { Box, Stack } from '@mui/material'
import TopNavigation from 'components/pages/draft/topNavigation'
import DraftList from 'components/pages/draft/draftList'
import useCornerRouter from 'lib/application/hooks/useCornerRouter'
import useDraftList from 'lib/application/hooks/cocktail/useDraftList'
import ConfirmButton from 'components/pages/draft/confirmButton'
import BottomButton from 'components/common/button/bottomButton'
import { paths } from 'lib/application/configs/routes'
import AuthGuard from 'components/app/authGuard'

const Drafts = () => {
  const websiteTitle = '草稿夾 - Corner'

  const router = useCornerRouter()
  const {
    drafts = [],
    loading,
    isBatchDeleteMode,
    isAllSelected,
    selectedIds,
    canToggleBatchDeleteMode,
    toggleDeleteMode,
    select,
    selectAll,
    deleteSelected
  } = useDraftList()

  const gotoCreatePost = () => router.push(paths.createPost)

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack gap="12px">
        <TopNavigation
          canToggleBatchDeleteMode={canToggleBatchDeleteMode}
          isBatchDeleteMode={isBatchDeleteMode}
          isAllSelected={isAllSelected}
          onSelectAll={selectAll}
          onDelete={toggleDeleteMode}
        />
        <Box px="16px" flex={1}>
          <DraftList
            loading={loading}
            drafts={drafts}
            isEditMode={isBatchDeleteMode}
            selectedIds={selectedIds}
            onCheck={select}
          />
        </Box>
      </Stack>
      {!loading && drafts.length === 0 && (
        <BottomButton position="fixed" onClick={gotoCreatePost}>
          快去發文
        </BottomButton>
      )}
      {isBatchDeleteMode && (
        <ConfirmButton
          selectedCount={selectedIds.length}
          onClick={deleteSelected}
        />
      )}
    </>
  )
}

const DraftsWithAuthGuard = () => (
  <AuthGuard>
    <Drafts />
  </AuthGuard>
)

export default DraftsWithAuthGuard
