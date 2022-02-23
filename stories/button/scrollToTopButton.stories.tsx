import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ScrollToTopButton from 'components/common/button/scrollToTopButton'

export default {
  title: 'button/Scroll To Top Button',
  component: ScrollToTopButton,
  argTypes: {
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof ScrollToTopButton>

const Template: ComponentStory<typeof ScrollToTopButton> = args => {
  return <ScrollToTopButton />
}

export const Normal = Template.bind({})
