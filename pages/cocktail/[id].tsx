import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Stack } from '@mui/material'
import BackButton from '../../components/backButton'
import LoadingScreen from '../../components/loadingScreen'
import CocktailDetails from '../../components/cocktailDetails/cocktailDetails'
import mockCocktails from '../../mock/mockCocktails'
import { Cocktail } from '../../types/cocktail'

const CocktailPage: NextPage = () => {
  const router = useRouter()
  const [cocktail, setCocktail] = useState<Cocktail | undefined>()
  const [loading, setLoading] = useState<Boolean>(false)
  const id = router.query.id

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      if (!id) return
      const cocktail = mockCocktails[0]
      setCocktail(cocktail)
      setLoading(false)
    }, 1000)
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
