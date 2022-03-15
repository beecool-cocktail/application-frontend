import type { CocktailPost } from 'lib/types/cocktail'

const mockCocktailPost: CocktailPost = {
  title: 'Gin Tonic',
  description:
    'this is side car this is side car this is side carcar this is side carcar this is side carcar this is side carcar this is side car',
  steps: [
    { description: 'step 1' },
    { description: 'step 2' },
    { description: 'step 3' },
    { description: 'step 4' },
    { description: 'step 5' }
  ],
  photos: ['/cocktail.jpg'],
  ingredients: [
    { name: '波本或裸麥威士忌', amount: 32, unit: 'L' },
    { name: '方糖', amount: 32, unit: 'L' },
    { name: '安格氏苦精', amount: 32, unit: 'L' }
  ],
  userInfo: {
    user_id: '1',
    user_name: 'Raven',
    email: 'raven@gmail.com',
    photo: '/cocktail.png',
    number_of_collection: 0,
    number_of_post: 0,
    is_collection_public: false
  }
}

export default mockCocktailPost
