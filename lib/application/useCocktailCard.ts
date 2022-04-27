import { useState } from 'react'
import { useRouter } from 'next/router'
import { getUrlById, paths } from 'lib/configs/routes'
import { CocktailPostItem } from 'lib/domain/cocktail'

const useCocktailCard = (
  cocktail: CocktailPostItem,
  onCollect: (id: number, isCollected: boolean) => void
) => {
  const router = useRouter()
  const [firstImageLoaded, setFirstImageLoaded] = useState<boolean>(false)
  const { id, title, userId, userName, isCollected } = cocktail

  const userDisplay = `@${userName}#${userId}`

  const gotoCocktailDetails = () =>
    router.push(getUrlById(paths.cocktailById, id))

  const collect = async () => {
    onCollect(id, isCollected)
  }

  const firstImageLoadingComplete = () => setFirstImageLoaded(true)

  return {
    firstImageLoaded,
    title,
    userDisplay,
    isCollected: cocktail.isCollected,
    gotoCocktailDetails,
    collect,
    firstImageLoadingComplete
  }
}
export default useCocktailCard
