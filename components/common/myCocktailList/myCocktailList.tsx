import React from 'react'
import Image from 'next/image'
import { Grid } from '@mui/material'
import useMyCocktailList from 'lib/application/useMyCocktailList'
import Error from '../status/error'
import Spinner from '../status/spinner'
import MyCocktailCard from './myCocktailCard'

const MyCocktailList = () => {
  const { data, loading, error, deleteById } = useMyCocktailList()
  if (error) return <Error />
  if (!data || loading) return <Spinner />
  if (data.length === 0)
    return <Image src="/post.png" alt="post" width={512} height={392} />

  return (
    <Grid container alignItems="flex-start" rowSpacing={1} columnSpacing={1}>
      {data.map(cocktail => (
        <Grid item xs={6} key={cocktail.id}>
          <MyCocktailCard cocktail={cocktail} onDelete={deleteById} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MyCocktailList
