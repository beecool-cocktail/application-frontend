import { PopularCocktailList } from 'sdk'
import { CocktailListService } from 'lib/application/ports'
import { CocktailPostItem } from 'lib/domain/cocktail'
import useCornerSWRInfinite from '../hooks/useInfiniteCornerSWR'

const useCocktailListService = (): CocktailListService => {
  const result = useCornerSWRInfinite<PopularCocktailList>('/cocktails')

  const getList = () => ({
    ...result,
    data: result.data.map(a =>
      a.map(b => {
        const cocktailPost: CocktailPostItem = {
          id: b.cocktail_id || 0,
          userId: b.user_id || 0,
          userName: b.user_name || '',
          title: b.title || '',
          photoUrls: b.photos || [],
          ingredients:
            b.ingredient_list?.map(i => ({
              name: i.name || '',
              amount: i.amount || ''
            })) || []
        }
        return cocktailPost
      })
    )
  })

  return { getList }
}

export default useCocktailListService
