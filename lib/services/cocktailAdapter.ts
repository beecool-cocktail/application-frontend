import useSWR from 'swr'
import { GetCocktailByIDResponse } from 'sdk'
import { CocktailService } from 'lib/application/ports'
import { CocktailPost } from 'lib/domain/cocktail'

const useCocktailService = (
  id: number | undefined,
  token: string | null
): CocktailService => {
  const getKey = () => {
    if (!id) return null
    const path = `/cocktails/${id}`
    return token ? [path, token] : path
  }

  const {
    data: resData,
    error,
    isValidating,
    mutate
  } = useSWR<GetCocktailByIDResponse>(getKey, { revalidateOnFocus: false })

  const getById = () => {
    let data: CocktailPost | undefined
    if (resData) {
      data = {
        id: resData.cocktail_id,
        userId: resData.user_id,
        userName: resData.user_name,
        title: resData.title,
        description: resData.description,
        photos: resData.photos.map(p => ({
          id: p.id,
          path: p.path
        })),
        ingredients: resData.ingredient_list.map(i => ({
          name: i.name,
          amount: i.amount
        })),
        steps: resData.step_list.map(s => ({ description: s.description })),
        isCollected: resData.is_collected
      }
    }
    return { data, error, mutate, isValidating }
  }

  return { getById }
}

export default useCocktailService
