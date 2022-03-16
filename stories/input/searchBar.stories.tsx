import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import SearchBar from 'components/common/input/searchBar'

export default {
  title: 'input/Search Bar',
  argTypes: {
    placeHolder: { type: 'string' },
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = args => {
  return <SearchBar {...args} />
}

export const Normal = Template.bind({})
Normal.args = {
  placeHolder: '找調酒...'
}
