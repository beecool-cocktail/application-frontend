import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ShareButton from 'components/common/button/shareButton'

export default {
  title: 'button/Share Button',
  component: ShareButton,
  argTypes: {
    title: { type: 'string' }
  }
} as ComponentMeta<typeof ShareButton>

const Template: ComponentStory<typeof ShareButton> = args => {
  return <ShareButton {...args} />
}

export const Normal = Template.bind({})
Normal.args = {
  title: 'Share String'
}
