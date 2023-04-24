import { useState } from 'react'
import { useRouter } from 'next/router'
import { getUrlById, pathname } from 'lib/configs/routes'
import { CocktailPostItem } from 'lib/domain/cocktail'
import { getUserIdDisplay } from 'lib/domain/user'

const useCocktailCard = (
  cocktail: CocktailPostItem,
  onCollect: (id: number, isCollected: boolean) => void
) => {
  const router = useRouter()
  const [firstImageLoaded, setFirstImageLoaded] = useState<boolean>(false)
  const { id, title, userId, userName, ingredients, isCollected } = cocktail

  const userDisplay = `@${userName}${getUserIdDisplay(userId)}`
  const getTitleDisplay = () => {
    if (title.length <= 30) return title
    return title.substring(0, 30) + '....'
  }
  const titleDisplay = getTitleDisplay()
  const ingredientsDisplay = ingredients.slice(0, 4)

  const gotoCocktailDetails = () =>
    router.push(getUrlById(pathname.cocktailById, id))

  const collect = async () => {
    onCollect(id, isCollected)
  }

  const firstImageLoadingComplete = () => setFirstImageLoaded(true)

  return {
    firstImageLoaded,
    titleDisplay,
    userDisplay,
    ingredientsDisplay,
    isCollected: cocktail.isCollected,
    gotoCocktailDetails,
    collect,
    firstImageLoadingComplete
  }
}
export default useCocktailCard
