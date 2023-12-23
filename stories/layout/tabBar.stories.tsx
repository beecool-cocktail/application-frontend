import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'
import { Stack } from '@mui/material'
import TabBar from 'components/layout/tabBar'
import { pathname } from 'lib/configs/routes'
import useOnce from 'lib/hooks/useOnce'
import { configHandler, responseJson } from 'lib/mocks/handlers'
import loggedInDecorator from 'stories/decorators/loggedInDecorator'
import useToken from 'lib/application/useToken'

export default {
  title: 'layout/Tab Bar',
  component: TabBar,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2873%3A4550'
    },
    msw: {
      handlers: [
        configHandler,
        rest.get('/api/users/current', (req, res, ctx) =>
          responseJson(res, ctx, {
            user_id: 1,
            user_name: 'Raven',
            email: 'raven@gmail.com',
            photo: 'cocktail.jpg',
            number_of_collection: 0,
            number_of_post: 0,
            is_collection_public: false
          })
        )
      ]
    }
  }
} as ComponentMeta<typeof TabBar>

const Template: ComponentStory<typeof TabBar> = () => (
  <>
    <Stack sx={{ width: '100vw', height: '125vh' }} />
    <TabBar />
  </>
)

export const Home = Template.bind({})

Home.parameters = {
  nextRouter: {
    path: pathname.index,
    asPath: pathname.index
  }
}

Home.decorators = [
  story => {
    const tokenService = useToken()
    useOnce(() => tokenService.removeToken())
    return story()
  }
]

export const Search = Template.bind({})
Search.parameters = {
  nextRouter: {
    path: pathname.search,
    asPath: pathname.search
  }
}

export const AddPost = Template.bind({})
AddPost.parameters = {
  nextRouter: {
    path: pathname.createPost,
    asPath: pathname.createPost
  }
}

export const ProfileTourist = Template.bind({})
ProfileTourist.parameters = {
  nextRouter: {
    path: pathname.profile,
    asPath: pathname.profile
  }
}

export const ProfileMember = Template.bind({})
ProfileMember.parameters = {
  nextRouter: {
    path: pathname.profile,
    asPath: pathname.profile
  }
}
ProfileMember.decorators = [loggedInDecorator]
