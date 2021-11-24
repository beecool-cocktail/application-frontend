import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Stack, IconButton, Button, Paper, Typography } from '@mui/material'
import { ArrowBack, ArrowRight } from '@mui/icons-material'
import Carousel from 'react-material-ui-carousel'
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
      const cocktail = mockCocktails.find(cocktail => cocktail.id === +id)
      setCocktail(cocktail)
      setLoading(false)
    }, 1000)
  }, [id])

  return (
    <Stack>
      {cocktail && (
        <>
          <Image
            src={cocktail.imageUrl}
            alt={cocktail.name}
            width="100%"
            height={250}
          />
          <Typography>Cocktail Page {id}</Typography>
          <Carousel PrevIcon={<ArrowBack />} NextIcon={<ArrowRight />}>
            <Paper>
              <h2>Hello</h2>
              <p>Jey!</p>
              <Button>Check it out!</Button>
            </Paper>
            <Paper>
              <h2>@#$!</h2>
              <p>123123!</p>
              <Button>Check it out!</Button>
            </Paper>
          </Carousel>
        </>
      )}
      <IconButton
        onClick={() => router.back()}
        sx={{
          position: 'absolute',
          left: 1,
          top: 1
        }}
      >
        <ArrowBack />
      </IconButton>
    </Stack>
  )
}

export default CocktailPage
