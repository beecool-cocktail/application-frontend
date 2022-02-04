import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Stack } from '@mui/material'
import BackButton from 'components/common/button/backButton'
import LoadingScreen from 'components/common/loadingScreen'
import CocktailDetails from 'components/pages/cocktailDetails/cocktailDetails'
import { Cocktail } from 'lib/types/cocktail'
import cocktailApi from 'lib/api/cocktail'

const CocktailPage: NextPage = () => {
  const router = useRouter()
  const [cocktail, setCocktail] = useState<Cocktail | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const id = router.query.id as string

  useEffect(() => {
    const getCocktail = async () => {
      if (!id) return
      setLoading(true)
      const cocktail = await cocktailApi.getCocktailById(id)
      setCocktail(cocktail)
      setLoading(false)
    }
    getCocktail()
  }, [id])

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="stretch"
      sx={{ minHeight: '100vh', width: '100%' }}
    >
      {loading || !cocktail ? (
        <LoadingScreen />
      ) : (
        <CocktailDetails cocktail={cocktail} />
      )}
      <BackButton />
    </Stack>
  )
}

export default CocktailPage
