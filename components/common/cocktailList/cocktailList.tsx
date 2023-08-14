import { Box, Stack } from '@mui/material'
import PullToRefresh from 'react-simple-pull-to-refresh'
import cocktailIllustration from 'public/illustrations/meme_cocktail.png'
import notFoundIllustration from 'public/illustrations/meme_confusedNY.png'
import useCocktailList from 'lib/application/cocktail/useCocktailList'
import { PAGE_SIZE } from 'lib/constants/pagination'
import Loading from 'components/common/status/loading'
import Empty from 'components/common/status/empty'
import IllustrationWithText from '../image/illustrationWithText'
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
    return Array.from(new Array(PAGE_SIZE)).map((_item, index) => (
      <CocktailSkeleton key={index} />
    ))
  }

  const renderNotFound = () => {
    return (
      <Box sx={{ mt: '131px', px: '8px' }}>
        <IllustrationWithText
          textFirst
          imgSrc={notFoundIllustration}
          text="查無結果"
        />
      </Box>
    )
  }

  const renderSearchPrompt = () => (
    <Box sx={{ mt: '131px', px: '8px' }}>
      <IllustrationWithText
        textFirst
        imgSrc={cocktailIllustration}
        text="快來搜尋(･8･)"
      />
    </Box>
  )

  const renderContent = () => {
    return <ErrorRetry onRetry={retry} />
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
        <Stack spacing="24px" sx={{ px: '32px' }}>
          {renderContent()}
          <Box height={100}>{renderBottom()}</Box>
        </Stack>
      </Stack>
    </PullToRefresh>
  )
}

export default CocktailList
