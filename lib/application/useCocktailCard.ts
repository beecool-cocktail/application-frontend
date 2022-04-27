import { useState } from 'react'
import { useRouter } from 'next/router'
import { getUrlById, paths } from 'lib/configs/routes'
import { CocktailPostItem } from 'lib/domain/cocktail'
import { FALLBACK_URL } from 'lib/constants/image'

const useCocktailCard = (
  cocktail: CocktailPostItem,
  onCollect: (id: number, isCollected: boolean) => void
) => {
  const router = useRouter()
  const [firstImageLoaded, setFirstImageLoaded] = useState<boolean>(false)
  const { id, photoUrls, title, userId, userName, isCollected } = cocktail

  const images = photoUrls.map(p => {
    if (new URL(p).pathname === '/') return FALLBACK_URL
    return p
  })

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
    images,
    userDisplay,
    isCollected: cocktail.isCollected,
    gotoCocktailDetails,
    collect,
    firstImageLoadingComplete
  }
}
export default useCocktailCard
