import React from 'react'
import Image from 'next/image'
import { Grid } from '@mui/material'
import useMyCocktailList from 'lib/application/cocktail/useMyCocktailList'
import Error from '../status/error'
import Loading from '../status/loading'
import CocktailCardSmall from '../cocktailCardSmall/cocktailCardSmall'

export interface MyCocktailListProps {
  userId?: number
}

const MyCocktailList = ({ userId }: MyCocktailListProps) => {
  const {
    data,
    loading,
    error,
    gotoCocktailPage,
    gotoEditPage,
    deleteCocktail
  } = useMyCocktailList(userId)
  if (error) return <Error />
  if (!data || loading) return <Loading />
  if (data.length === 0)
    return <Image src="/post.png" alt="post" width={512} height={392} />

  return (
    <Grid
      container
      alignItems="flex-start"
      rowSpacing="8px"
      columnSpacing="8px"
      sx={{ p: '8px', color: theme => theme.palette.dark3.main }}
    >
      {data.map(cocktail => (
        <Grid item xs={6} key={cocktail.id} sx={{ aspectRatio: '176/171' }}>
          <CocktailCardSmall
            cocktail={cocktail}
            actions={[
              { text: '刪除貼文', onClick: gotoEditPage },
              { text: '編輯貼文', onClick: deleteCocktail }
            ]}
            onClick={gotoCocktailPage}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default MyCocktailList
