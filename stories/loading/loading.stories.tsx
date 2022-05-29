import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Loading from 'components/common/status/loading'

export default {
  title: 'status/Loading',
  component: Loading,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3342%3A7722'
    }
  }
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = () => {
  return <Loading />
}

export const Normal = Template.bind({})
