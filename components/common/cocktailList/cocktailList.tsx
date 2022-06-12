import { Box, Stack, Typography } from '@mui/material'
import PullToRefresh from 'react-simple-pull-to-refresh'
import useCocktailList from 'lib/application/useCocktailList'
import { PAGE_SIZE } from 'lib/constants/pagination'
import Loading from 'components/common/status/loading'
import Empty from 'components/common/status/empty'
import NotFound from 'components/common/status/notFound'
import CocktailCard from './cocktailCard'
import CocktailSkeleton from './cocktailSkeleton'
import ErrorRetry from './errorRetry'
import NoMoreHint from './noMoreHint'

interface CocktailListProps {
  useSearch?: boolean
}

const CocktailList = ({ useSearch }: CocktailListProps) => {
  const {
    bottomRef,
    keyword,
    cocktails = [],
    error,
    isLoadingInitialData,
    isLoadingMore,
    isRefreshing,
    isEmpty,
    isReachingEnd,
    collect,
    retry
  } = useCocktailList(PAGE_SIZE, useSearch)

  const renderSkeletonList = () => {
    return Array.from(new Array(PAGE_SIZE)).map((item, index) => (
      <CocktailSkeleton key={index} />
    ))
  }

  const renderNotFound = () => {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <NotFound />
      </Box>
    )
  }

  const renderSearchPrompt = () => {
    return (
      <Typography variant="h1" textAlign="center" sx={{ color: 'white' }}>
        快來搜尋(･8･)
      </Typography>
    )
  }

  const renderContent = () => {
    if (useSearch) {
      if (!keyword) return renderSearchPrompt()
    }
    if (isLoadingInitialData) return renderSkeletonList()
    if (error) return <ErrorRetry onRetry={retry} />
    if (isEmpty) {
      if (useSearch) return renderNotFound()
      return <Empty />
    }

    return cocktails.map(cocktail => (
      <CocktailCard key={cocktail.id} cocktail={cocktail} onCollect={collect} />
    ))
  }

  const renderBottom = () => {
    if (isLoadingMore && !isLoadingInitialData) return <Loading />
    if (isReachingEnd) return <NoMoreHint />
    return <Box ref={bottomRef} />
  }

  return (
    <PullToRefresh
      isPullable={!(isRefreshing || isLoadingInitialData || isLoadingMore)}
      pullingContent=""
      refreshingContent={<Loading />}
      maxPullDownDistance={95}
      pullDownThreshold={44}
      onRefresh={retry}
    >
      <Stack justifyContent="flex-start" alignItems="stretch">
        <Stack
          spacing="24px"
          sx={{
            pt: '8px',
            px: '32px',
            backgroundColor: theme => theme.palette.dark3.main
          }}
        >
          {renderContent()}
          <Box height={100}>{renderBottom()}</Box>
        </Stack>
      </Stack>
    </PullToRefresh>
  )
}

export default CocktailList
