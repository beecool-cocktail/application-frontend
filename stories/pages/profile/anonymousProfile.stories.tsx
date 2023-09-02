import { ComponentMeta, ComponentStory } from '@storybook/react'
import AnonymousProfile from 'components/pages/profile/anonymousProfile'

export default {
  title: 'pages/Anonymous Profile',
  component: AnonymousProfile,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    }
  }
} as ComponentMeta<typeof AnonymousProfile>

const Template: ComponentStory<typeof AnonymousProfile> = () => (
  <AnonymousProfile />
)

export const Default = Template.bind({})
