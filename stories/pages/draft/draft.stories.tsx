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
  '經典威士忌',
  '血腥瑪莉 Bloody Mary',
  'Vodka Lime 伏特加萊姆',
  'Mojito 家中特調款',
  'Gin Tonic 琴湯尼',
  'Mojito 家中特調款',
  'Gin Tonic 琴湯尼'
].map((title, index) => ({
  cocktail_id: index + 1,
  title,
  description: '關於威士忌的起源有點關於威士忌關於威士忌的起源有點關於威士忌',
  created_date: '',
  photo: `/cocktail-${(index % 3) + 1}.jpg`
}))

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

export const Skeleton = Template.bind({})
Skeleton.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/cocktail-drafts', (_req, res, ctx) =>
        res(ctx.delay('infinite'))
      )
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
