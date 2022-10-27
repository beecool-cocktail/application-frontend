import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import RiveLogo from 'components/layout/riveLogo'
// import animationData from './animationData.json'

export default {
  title: 'Layout/Rive Logo',
  component: RiveLogo
} as ComponentMeta<typeof RiveLogo>

const Template: ComponentStory<typeof RiveLogo> = ({ ...args }) => (
  <RiveLogo {...args} />
)

export const PlayOnceByPath = Template.bind({})
PlayOnceByPath.args = {
  src: 'https://cdn.rive.app/animations/vehicles.riv',
  autoplay: false
}

// export const LoopByPath = Template.bind({})
// LoopByPath.args = {
//   loop: true,
//   autoplay: true,
//   path: 'https://assets2.lottiefiles.com/packages/lf20_ux73oxwe.json'
// }

// export const PlayOnceByAnimationData = Template.bind({})
// PlayOnceByAnimationData.args = {
//   loop: false,
//   autoplay: true,
//   animationData
// }

// export const LoopByAnimationData = Template.bind({})
// LoopByAnimationData.args = {
//   loop: true,
//   autoplay: true,
//   animationData
// }
