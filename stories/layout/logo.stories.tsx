import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Logo from 'components/layout/logo'
import animationData from './animationData.json'

export default {
  title: 'Layout/Logo',
  component: Logo
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = ({ ...args }) => (
  <Logo {...args} />
)

export const PlayOnceByPath = Template.bind({})
PlayOnceByPath.args = {
  loop: false,
  autoplay: true,
  path: '/lazydoge-wine.json'
}

export const LoopByPath = Template.bind({})
LoopByPath.args = {
  loop: true,
  autoplay: true,
  path: '/lazydoge-wine.json'
}

export const PlayOnceByAnimationData = Template.bind({})
PlayOnceByAnimationData.args = {
  loop: false,
  autoplay: true,
  animationData
}

export const LoopByAnimationData = Template.bind({})
LoopByAnimationData.args = {
  loop: true,
  autoplay: true,
  animationData
}
