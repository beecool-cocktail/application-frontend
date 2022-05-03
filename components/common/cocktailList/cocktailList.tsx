import { Box, Stack, Typography } from '@mui/material'
import useCocktailList from 'lib/application/useCocktailList'
import { PAGE_SIZE } from 'lib/constants/pagination'
import Spinner from 'components/common/status/spinner'
import Empty from 'components/common/status/empty'
import CocktailCard from './cocktailCard'
import CocktailSkeleton from './cocktailSkeleton'
import ErrorRetry from './errorRetry'
import NoMoreHint from './noMoreHint'

const CocktailList = () => {
  const {
    bottomRef,
    cocktails = [],
    error,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    collect,
    retry
  } = useCocktailList()

  const renderContent = () => {
    if (error) return <ErrorRetry onRetry={retry} />
    if (isLoadingInitialData) {
      return Array.from(new Array(PAGE_SIZE)).map((item, index) => (
        <CocktailSkeleton key={index} />
      ))
    }
    if (cocktails.length === 0) return <Empty />

    return cocktails.map(cocktail => (
      <CocktailCard key={cocktail.id} cocktail={cocktail} onCollect={collect} />
    ))
  }

  return (
    <Stack justifyContent="flex-start" alignItems="stretch">
      <Stack
        spacing="24px"
        sx={{
          pt: '24px',
          px: '32px',
          backgroundColor: theme => theme.palette.dark2.main
        }}
      >
        {renderContent()}
        {isEmpty && <Typography>Empty</Typography>}
        <Box height={100}>
          {isLoadingMore && !isLoadingInitialData ? (
            <Spinner />
          ) : isReachingEnd ? (
            <NoMoreHint />
          ) : (
            <Box ref={bottomRef} />
          )}
        </Box>
      </Stack>
    </Stack>
  )
}

export default CocktailList
