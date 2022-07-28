import { ComponentStory, ComponentMeta } from '@storybook/react'
import { rest } from 'msw'
import { GetDraftCocktailListResponse, DraftCocktailList } from 'sdk'
import { configHandler, responseJson } from 'lib/mocks/handlers'
import Draft from 'pages/profile/drafts/index'

export default {
  title: 'Pages/Draft',
  component: Draft,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: ''
    }
  }
} as ComponentMeta<typeof Draft>

const Template: ComponentStory<typeof Draft> = () => {
  return <Draft />
}

const drafts: DraftCocktailList[] = [
  {
    cocktail_id: 1,
    title: '經典威士忌',
    description: '關於威士忌的起源有點關於威士忌關於威士忌的起源有點關於威士忌',
    created_date: '',
    photo: '/cocktail-1.jpg'
  },
  {
    cocktail_id: 2,
    title: '血腥瑪莉 Bloody Mary',
    description: '關於威士忌的起源有點關於威士忌關於威士忌的起源有點關於威士忌',
    created_date: '',
    photo: '/cocktail-2.jpg'
  },
  {
    cocktail_id: 3,
    title: 'Vodka Lime 伏特加萊姆',
    description: '關於威士忌的起源有點關於威士忌關於威士忌的起源有點關於威士忌',
    created_date: '',
    photo: '/cocktail-3.jpg'
  },
  {
    cocktail_id: 4,
    title: 'Mojito 家中特調款',
    description: '關於威士忌的起源有點關於威士忌關於威士忌的起源有點關於威士忌',
    created_date: '',
    photo: '/cocktail-1.jpg'
  },
  {
    cocktail_id: 5,
    title: 'Gin Tonic 琴湯尼',
    description: '關於威士忌的起源有點關於威士忌關於威士忌的起源有點關於威士忌',
    created_date: '',
    photo: '/cocktail-2.jpg'
  },
  {
    cocktail_id: 6,
    title: 'Mojito 家中特調款',
    description: '關於威士忌的起源有點關於威士忌關於威士忌的起源有點關於威士忌',
    created_date: '',
    photo: '/cocktail-3.jpg'
  },
  {
    cocktail_id: 7,
    title: 'Gin Tonic 琴湯尼',
    description: '關於威士忌的起源有點關於威士忌關於威士忌的起源有點關於威士忌',
    created_date: '',
    photo: '/cocktail-1.jpg'
  }
]

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/cocktail-drafts', (_req, res, ctx) => {
        const data: GetDraftCocktailListResponse = {
          draft_cocktail_list: drafts,
          total: 10
        }
        return responseJson(res, ctx, data)
      })
    ]
  }
}

export const NoDraft = Template.bind({})
NoDraft.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/cocktail-drafts', (_req, res, ctx) => {
        const data: GetDraftCocktailListResponse = {
          draft_cocktail_list: [],
          total: 0
        }
        return responseJson(res, ctx, data)
      })
    ]
  }
}
