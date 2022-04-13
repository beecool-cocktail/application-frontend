import { useState } from 'react'
import { useRouter } from 'next/router'
import { getUrlById, paths } from 'lib/configs/routes'
import { CocktailPostItem } from 'lib/domain/cocktail'
import { FALLBACK_URL } from 'lib/constants/image'

const useCocktailCard = (cocktail: CocktailPostItem) => {
  const router = useRouter()
  const [firstImageLoaded, setFirstImageLoaded] = useState<boolean>(true)
  const { id, photoUrls, title, ingredients, userId, userName } = cocktail

  const images = photoUrls.map(p => {
    if (new URL(p).pathname === '/') return FALLBACK_URL
    return p
  })

  const getIngredientsDisplay = () => {
    let result = ''
    ingredients.forEach((ingredient, index) => {
      if (index === ingredients.length - 1) result += ingredient.name
      else result += `${ingredient.name} / `
    })
    return result
  }

  const userDisplay = `@${userName}#${userId}`

  const gotoCocktailDetails = () =>
    router.push(getUrlById(paths.cocktailById, id))

  const collect = () => {
    // eslint-disable-next-line no-console
    console.log('collect')
  }

  const firstImageLoadingComplete = () => setFirstImageLoaded(true)

  return {
    firstImageLoaded,
    title,
    images,
    ingredientsDisplay: getIngredientsDisplay(),
    userDisplay,
    isCollected: cocktail.isCollected,
    gotoCocktailDetails,
    collect,
    firstImageLoadingComplete
  }
}
export default useCocktailCard
