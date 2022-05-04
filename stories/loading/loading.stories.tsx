import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Loading from 'components/common/status/loading'

export default {
  title: 'status/Loading',
  component: Loading
} as ComponentMeta<typeof Loading>

const Template: ComponentStory<typeof Loading> = () => {
  return <Loading />
}

export const Normal = Template.bind({})
