import { useEffect, ReactElement } from 'react'
import Head from 'next/head'
import { useInView } from 'react-intersection-observer'
import { Box, Stack, Typography } from '@mui/material'
import Layout from 'components/layout/layout'
import SearchBar from 'components/common/input/searchBar'
import CocktailCardList from 'components/common/cocktailCardList/cocktailCardList'
import Spinner from 'components/common/status/spinner'
import useCocktailList from 'lib/hooks/useCocktailList'

const Home = () => {
  const {
    cocktails = [],
    error,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    loadMore
  } = useCocktailList()
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && !error && !isLoadingMore && !isReachingEnd && !isRefreshing)
      loadMore()
  }, [error, inView, isLoadingMore, isReachingEnd, isRefreshing, loadMore])

  return (
    <>
      <Head>
        <title>Whispering Corner</title>
        <meta name="description" content="Whispering Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoadingInitialData ? (
        <Spinner />
      ) : (
        <Stack justifyContent="flex-start" alignItems="stretch">
          <CocktailCardList cocktails={cocktails} />
          {isEmpty && <Typography>Empty</Typography>}
          <Box height={100}>
            {isLoadingMore ? (
              <Spinner />
            ) : isReachingEnd ? (
              <Typography textAlign="center">No more cocktails</Typography>
            ) : (
              <Box ref={ref} />
            )}
          </Box>
        </Stack>
      )}
    </>
  )
}

Home.getLayout = (page: ReactElement) => (
  <Layout
    header={
      <Box px="24px" display="flex" flexDirection="column" alignItems="stretch">
        <Box>
          <img src="logo.svg" alt="logo" width={'100%'} />
        </Box>
        <SearchBar placeHolder="找調酒..." />
      </Box>
    }
  >
    {page}
  </Layout>
)

export default Home
