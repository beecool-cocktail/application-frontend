import { Box, Stack } from '@mui/material'
import TopNavigation from 'components/pages/draft/topNavigation'
import DraftList from 'components/pages/draft/draftList'
import useDraftList from 'lib/application/cocktail/useDraftList'
import Loading from 'components/common/status/loading'
import ConfirmButton from 'components/pages/draft/confirmButton'

const Drafts = () => {
  const {
    drafts = [],
    loading,
    isBatchDeleteMode,
    isAllSelected,
    selectedIds,
    toggleDeleteMode,
    select,
    selectAll,
    deleteSelected
  } = useDraftList()

  if (loading) return <Loading />

  return (
    <>
      <Stack width={1} gap="12px" minHeight="100vh">
        <TopNavigation
          isEditMode={isBatchDeleteMode}
          isAllSelected={isAllSelected}
          onSelectAll={selectAll}
          onDelete={toggleDeleteMode}
        />
        <Box px="16px" flex={1}>
          <DraftList
            drafts={drafts}
            isEditMode={isBatchDeleteMode}
            selectedIds={selectedIds}
            onCheck={select}
          />
        </Box>
      </Stack>
      {isBatchDeleteMode && (
        <ConfirmButton
          selectedCount={selectedIds.length}
          onClick={deleteSelected}
        />
      )}
    </>
  )
}

export default Drafts
