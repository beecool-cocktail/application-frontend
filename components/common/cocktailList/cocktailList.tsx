import { Box, Stack, Typography } from '@mui/material'
import useCocktailList from 'lib/application/useCocktailList'
import { PAGE_SIZE } from 'lib/constants/pagination'
import Spinner from 'components/common/status/spinner'
import Error from 'components/common/status/error'
import Empty from 'components/common/status/empty'
import CocktailCard from './cocktailCard'

const CocktailList = () => {
  const {
    bottomRef,
    cocktails = [],
    error,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    collect
  } = useCocktailList()

  const renderContent = () => {
    if (error) return <Error />
    if (isLoadingInitialData) {
      return Array.from(new Array(PAGE_SIZE)).map((item, index) => (
        <CocktailCard key={index} cocktail={item} onCollect={collect} />
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
            <Typography textAlign="center">No more cocktails</Typography>
          ) : (
            <Box ref={bottomRef} />
          )}
        </Box>
      </Stack>
    </Stack>
  )
}

export default CocktailList
