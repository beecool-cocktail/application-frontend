import mockUserInfo from './userInfo'
import mockIngredients from './ingredients'
import type { Cocktail } from 'lib/types/cocktail'
import type { PaginationResponse } from 'lib/types/api/responseBase'

const mockCocktailList: PaginationResponse<Cocktail> = {
  total: 18,
  popular_cocktail_list: [
    {
      cocktail_id: 98078024211279,
      photos: [
        'static/e782a293-225a-42a6-81eb-fe8c5ab05db4.webp',
        'static/e782a293-225a-42a6-81eb-fe8c5ab05db4.webp'
      ],
      title: 'tester',
      created_date: '2022-02-17 11:41:18',
      ingredients: mockIngredients,
      userInfo: mockUserInfo
    },
    {
      cocktail_id: 98026853936941,
      photos: [
        'static/e782a293-225a-42a6-81eb-fe8c5ab05db4.webp',
        'static/e782a293-225a-42a6-81eb-fe8c5ab05db4.webp'
      ],
      title: '132',
      created_date: '2022-02-17 11:40:26',
      ingredients: mockIngredients,
      userInfo: mockUserInfo
    },
    {
      cocktail_id: 97902737898357,
      photos: [
        'static/e782a293-225a-42a6-81eb-fe8c5ab05db4.webp',
        'static/e782a293-225a-42a6-81eb-fe8c5ab05db4.webp'
      ],
      title: '123',
      created_date: '2022-02-17 11:38:22',
      ingredients: mockIngredients,
      userInfo: mockUserInfo
    },
    {
      cocktail_id: 97871063173135,
      photos: ['static/e782a293-225a-42a6-81eb-fe8c5ab05db4.webp'],
      title: '321',
      created_date: '2022-02-17 11:37:51',
      ingredients: mockIngredients,
      userInfo: mockUserInfo
    },
    {
      cocktail_id: 97871424327134,
      photos: [
        'static/e782a293-225a-42a6-81eb-fe8c5ab05db4.webp',
        'static/e782a293-225a-42a6-81eb-fe8c5ab05db4.webp'
      ],
      title: '321',
      created_date: '2022-02-17 11:37:51',
      ingredients: mockIngredients,
      userInfo: mockUserInfo
    }
  ]
}

export default mockCocktailList
