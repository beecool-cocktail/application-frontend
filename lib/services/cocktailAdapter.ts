import { GetCocktailByIDResponse } from 'sdk'
import { CocktailService } from 'lib/application/ports'
import useCornerSWR from 'lib/hooks/useCornerSWR'
import { CocktailPost } from 'lib/domain/cocktail'

const useCocktailService = (id?: number): CocktailService => {
  const {
    data: resData,
    error,
    isValidating,
    mutate
  } = useCornerSWR<GetCocktailByIDResponse>(id ? `/cocktails/${id}` : null)

  const getById = () => {
    let data: CocktailPost | undefined
    if (resData) {
      data = {
        id: resData.cocktail_id || 0,
        userId: resData.user_id || 0,
        userName: resData.user_name || '',
        title: resData.title || '',
        description: resData.description || '',
        photos:
          resData.photos?.map(p => ({
            id: p.id || 0,
            path: p.path || ''
          })) || [],
        ingredients:
          resData.ingredient_list?.map(i => ({
            name: i.name || '',
            amount: i.amount || ''
          })) || [],
        steps:
          resData.step_list?.map(s => ({ description: s.description || '' })) ||
          []
      }
    }
    return { data, error, mutate, isValidating }
  }

  return { getById }
}

export default useCocktailService
