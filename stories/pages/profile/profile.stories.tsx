import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'
import { move, range } from 'ramda'
import ProfileDetail from 'components/pages/profile/profileDetail'
import { configHandler, responseJson } from 'lib/mocks/handlers'
import {
  GetUserInfoResponse,
  GetSelfCocktailListResponse,
  GetUserFavoriteCocktailListResponse,
  OtherCocktailList
} from 'sdk'
import loggedInDecorator from 'stories/decorators/loggedInDecorator'

export default {
  title: 'profile/Profile',
  component: ProfileDetail,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    }
  }
} as ComponentMeta<typeof ProfileDetail>

const titles = [
  '血腥瑪莉 Bloody Mary',
  'Vodka Lime 伏特加萊姆',
  'Mojito 家中特條款',
  'Gin Tonic 琴湯尼',
  '橡木桶的寶藏',
  '我是測試調酒'
]

const count = 15
const genCocktail = (index: number): OtherCocktailList => ({
  cocktail_id: index + 1,
  title: titles[(index % titles.length) + 1],
  photo: `/cocktail-${(index % 3) + 1}.jpg`,
  user_name: '123123',
  is_collected: true
})
const cocktails: OtherCocktailList[] = range(0, count).map(genCocktail)

const userInfoResponse: GetUserInfoResponse = {
  user_id: 1234,
  user_name: 'Heather H. Jenner',
  email: 'jenner@gmail.com',
  origin_avatar: '/avatar.png',
  crop_avatar: '/avatar.png',
  number_of_collection: count,
  number_of_post: count,
  is_collection_public: true,
  coordinate: [],
  width: 0,
  height: 0
}

const userFavoriteCocktailListResponse: GetUserFavoriteCocktailListResponse = {
  is_public: true,
  total: count,
  favorite_cocktail_list: move(-1, 0, cocktails)
}

const Template: ComponentStory<typeof ProfileDetail> = args => (
  <ProfileDetail {...args} />
)

export const Profile = Template.bind({})
Profile.args = {}
Profile.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/users/current', (_req, res, ctx) =>
        responseJson(res, ctx, userInfoResponse)
      ),
      rest.get('/api/users/current/cocktails', (req, res, ctx) => {
        const data: GetSelfCocktailListResponse = { cocktail_list: cocktails }
        return responseJson(res, ctx, data)
      }),
      rest.get('/api/users/current/favorite-cocktails', (req, res, ctx) =>
        responseJson(res, ctx, userFavoriteCocktailListResponse)
      )
    ]
  }
}
Profile.decorators = [loggedInDecorator]

export const ProfileWithNoPost = Template.bind({})
ProfileWithNoPost.args = {}
ProfileWithNoPost.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/users/current', (_req, res, ctx) =>
        responseJson(res, ctx, {
          ...userInfoResponse,
          number_of_collection: 0,
          number_of_post: 0
        })
      ),
      rest.get('/api/users/current/cocktails', (req, res, ctx) => {
        const data: GetSelfCocktailListResponse = { cocktail_list: [] }
        return responseJson(res, ctx, data)
      }),
      rest.get('/api/users/current/favorite-cocktails', (req, res, ctx) =>
        responseJson(res, ctx, {
          ...userFavoriteCocktailListResponse,
          total: 0,
          favorite_cocktail_list: []
        })
      )
    ]
  }
}
ProfileWithNoPost.decorators = [loggedInDecorator]

export const Skeleton = Template.bind({})
Skeleton.args = {}
Skeleton.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/users/current', (_req, res, ctx) =>
        res(ctx.delay('infinite'))
      ),
      rest.get('/api/users/current/cocktails', (req, res, ctx) =>
        res(ctx.delay('infinite'))
      ),
      rest.get('/api/users/current/favorite-cocktails', (req, res, ctx) =>
        res(ctx.delay('infinite'))
      )
    ]
  }
}
Skeleton.decorators = [loggedInDecorator]

const userId = 1234

export const Visitor = Template.bind({})
Visitor.args = { userId }
Visitor.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get(`/api/users/${userId}`, (req, res, ctx) =>
        responseJson(res, ctx, userInfoResponse)
      ),
      rest.get(`/api/users/${userId}/cocktails`, (req, res, ctx) => {
        const data: GetSelfCocktailListResponse = { cocktail_list: cocktails }
        return responseJson(res, ctx, data)
      }),
      rest.get(`/api/users/${userId}/favorite-cocktails`, (req, res, ctx) =>
        responseJson(res, ctx, userFavoriteCocktailListResponse)
      )
    ]
  }
}

export const VisitorWithPrivateCollection = Template.bind({})
VisitorWithPrivateCollection.args = { userId }
VisitorWithPrivateCollection.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get(`/api/users/${userId}`, (req, res, ctx) => {
        const data: GetUserInfoResponse = {
          ...userInfoResponse,
          is_collection_public: false,
          number_of_collection: count
        }
        return responseJson(res, ctx, data)
      }),
      rest.get(`/api/users/${userId}/cocktails`, (req, res, ctx) => {
        const data: GetSelfCocktailListResponse = { cocktail_list: cocktails }
        return responseJson(res, ctx, data)
      }),
      rest.get(`/api/users/${userId}/favorite-cocktails`, (req, res, ctx) => {
        const data: GetUserFavoriteCocktailListResponse = {
          is_public: false,
          total: count,
          favorite_cocktail_list: []
        }
        return responseJson(res, ctx, data)
      })
    ]
  }
}
