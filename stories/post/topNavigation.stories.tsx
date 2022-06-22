import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import TopNavigation from 'components/common/post/topNavigation'

export default {
  title: 'post/TopNavigation',
  component: TopNavigation,
  argTypes: {
    title: { type: 'string' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    }
  }
} as ComponentMeta<typeof TopNavigation>

const Template: ComponentStory<typeof TopNavigation> = args => {
  return <TopNavigation {...args} />
}

export const PrimaryDefault = Template.bind({})
PrimaryDefault.args = {
  title: 'Old Fashioned'
}
