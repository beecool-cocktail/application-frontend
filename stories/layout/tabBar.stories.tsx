import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'
import TabBar from 'components/layout/tabBar'
import { paths } from 'lib/configs/routes'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useOnce from 'lib/hooks/useOnce'
import { configHandler, responseJson } from 'lib/mocks/handlers'

export default {
  title: 'layout/Tab Bar',
  component: TabBar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2560%3A5139'
    },
    msw: {
      handlers: [
        configHandler,
        rest.get('/api/user/info', (req, res, ctx) =>
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

const Template: ComponentStory<typeof TabBar> = () => <TabBar />

export const LoggedOut = Template.bind({})

LoggedOut.parameters = {
  nextRouter: {
    path: paths.index,
    asPath: paths.index
  }
}

LoggedOut.decorators = [
  story => {
    const storage = useLocalStorage()
    useOnce(() => storage.removeToken())
    return story()
  }
]

export const LoggedIn = Template.bind({})

LoggedIn.parameters = {
  nextRouter: {
    path: paths.index,
    asPath: paths.index
  }
}

LoggedIn.decorators = [
  story => {
    const storage = useLocalStorage()
    useOnce(() => storage.setToken('mock login token'))
    return story()
  }
]
