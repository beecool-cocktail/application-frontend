import { PopularCocktailList } from 'sdk'
import { CocktailListService } from 'lib/application/ports'
import { CocktailPostItem } from 'lib/domain/cocktail'
import useCornerSWRInfinite from '../hooks/useInfiniteCornerSWR'

const useCocktailListService = (token: string | null): CocktailListService => {
  const result = useCornerSWRInfinite<PopularCocktailList>('/cocktails', token)

  const getList = () => ({
    ...result,
    data: result.data.map(cocktailArray =>
      cocktailArray.map(cocktail => {
        const cocktailPost: CocktailPostItem = {
          id: cocktail.cocktail_id,
          userId: cocktail.user_id,
          userName: cocktail.user_name,
          title: cocktail.title,
          photoUrls: cocktail.photos,
          ingredients: cocktail.ingredient_list.map(i => ({
            name: i.name,
            amount: i.amount
          })),
          isCollected: cocktail.is_collected
        }
        return cocktailPost
      })
    )
  })

  return { getList }
}

export default useCocktailListService
