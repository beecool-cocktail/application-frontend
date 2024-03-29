import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import LottieLogo from 'components/layout/lottieLogo'
import animationData from './animationData.json'

export default {
  title: 'Layout/Lottie Logo',
  component: LottieLogo
} as ComponentMeta<typeof LottieLogo>

const Template: ComponentStory<typeof LottieLogo> = ({ ...args }) => (
  <LottieLogo {...args} />
)

export const PlayOnceByPath = Template.bind({})
PlayOnceByPath.args = {
  loop: false,
  autoplay: true,
  path: 'https://assets2.lottiefiles.com/packages/lf20_ux73oxwe.json'
}

export const LoopByPath = Template.bind({})
LoopByPath.args = {
  loop: true,
  autoplay: true,
  path: 'https://assets2.lottiefiles.com/packages/lf20_ux73oxwe.json'
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
