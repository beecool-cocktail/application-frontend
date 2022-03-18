import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import TabBar from 'components/layout/tabBar'
import { paths } from 'lib/configs/routes'

export default {
  title: 'layout/Tab Bar',
  component: TabBar,
  argTypes: {
    value: { type: 'string' },
    onChange: { action: 'change' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2560%3A5139'
    }
  }
} as ComponentMeta<typeof TabBar>

const Template: ComponentStory<typeof TabBar> = args => {
  return <TabBar {...args} />
}

export const Normal = Template.bind({})

Normal.args = {
  value: paths.index
}