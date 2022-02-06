export type Cocktail = {
  cocktail_id: number
  title: string
  tags?: string[]
  photo: string
  created_date: string
}

export interface CocktailList {
  total: number
  popular_cocktail_list: Cocktail[]
}
