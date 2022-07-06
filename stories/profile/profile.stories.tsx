import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'
import ProfileDetail from 'components/pages/profile/profileDetail'
import { configHandler, responseJson } from 'lib/mocks/handlers'
import { GetUserInfoResponse, GetSelfCocktailListResponse } from 'sdk'

export default {
  title: 'profile/Profile',
  component: ProfileDetail,
  argTypes: {
    onCollect: { action: 'collect' }
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    }
  }
} as ComponentMeta<typeof ProfileDetail>

const Template: ComponentStory<typeof ProfileDetail> = args => {
  return <ProfileDetail {...args} />
}

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/users/current', (req, res, ctx) => {
        const data: GetUserInfoResponse = {
          user_id: 1234,
          user_name: 'Heather H. Jenner',
          email: 'jenner@gmail.com',
          photo: '',
          number_of_collection: 15,
          number_of_post: 15,
          is_collection_public: true
        }
        return responseJson(res, ctx, data)
      }),
      rest.get('/api/users/current/cocktails', (req, res, ctx) => {
        const data: GetSelfCocktailListResponse = {
          cocktail_list: [
            {
              cocktail_id: 1234,
              photo: '',
              title: 'title',
              user_name: '123123'
            },
            {
              cocktail_id: 1234,
              photo: '',
              title: 'title',
              user_name: '123123'
            },
            {
              cocktail_id: 1234,
              photo: '',
              title: 'title',
              user_name: '123123'
            },
            {
              cocktail_id: 1234,
              photo: '',
              title: 'title',
              user_name: '123123'
            },
            {
              cocktail_id: 1234,
              photo: '',
              title: 'title',
              user_name: '123123'
            },
            {
              cocktail_id: 1234,
              photo: '',
              title: 'title',
              user_name: '123123'
            }
          ]
        }
        return responseJson(res, ctx, data)
      })
    ]
  }
}
