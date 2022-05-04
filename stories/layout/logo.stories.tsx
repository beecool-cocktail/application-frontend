import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Logo from 'components/layout/logo'

export default {
  title: 'Layout/Logo',
  component: Logo
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = () => <Logo />

export const Normal = Template.bind({})
