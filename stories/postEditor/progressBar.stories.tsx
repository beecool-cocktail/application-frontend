import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ProgressBar from 'components/common/postEditor/progressBar'

export default {
  title: 'PostCreate/Progress Bar',
  component: ProgressBar,
  argTypes: {
    totalStep: { type: 'number' },
    activeStep: { type: 'number' }
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=7630%3A19210&t=H0boGFEg1imsRkiS-4'
    }
  }
} as ComponentMeta<typeof ProgressBar>

const Template: ComponentStory<typeof ProgressBar> = args => {
  return <ProgressBar {...args} />
}

export const Default = Template.bind({})
Default.args = {
  totalStep: 3,
  activeStep: 1
}
