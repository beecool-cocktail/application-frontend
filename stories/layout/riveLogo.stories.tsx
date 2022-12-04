import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import RiveLogo from 'components/layout/riveLogo'

export default {
  title: 'Layout/Rive Logo',
  component: RiveLogo
} as ComponentMeta<typeof RiveLogo>

const Template: ComponentStory<typeof RiveLogo> = ({ ...args }) => (
  <RiveLogo {...args} />
)

export const Default = Template.bind({})
Default.args = {
  src: './logo.riv',
  artboard: 'Logo Fold',
  stateMachines: 'State Machine 1',
  scrolling: false
}
