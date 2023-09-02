import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box } from '@mui/material'
import LogoHeader from 'components/layout/logoHeader'

export default {
  title: 'Layout/Logo Header',
  component: LogoHeader,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof LogoHeader>

const Template: ComponentStory<typeof LogoHeader> = () => (
  <Box margin="0 auto" width={500} height={1200}>
    <LogoHeader />
  </Box>
)

export const Normal = Template.bind({})
