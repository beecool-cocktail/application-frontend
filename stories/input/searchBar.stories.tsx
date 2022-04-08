import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import SearchBar from 'components/common/input/searchBar'
import useStore from 'lib/services/storeAdapter'

export default {
  title: 'input/Search Bar',
  argTypes: {
    placeHolder: { type: 'string' },
    onClick: { action: 'click' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2544%3A5478'
    }
  },
  decorators: [
    story => {
      const toInitialState = useStore(state => state.toInitialState)
      toInitialState()
      return story()
    }
  ]
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = args => {
  return <SearchBar {...args} />
}

export const Default = Template.bind({})
Default.args = {
  placeHolder: '找調酒...'
}

export const Selected = Template.bind({})
Selected.args = {
  autoFocus: true,
  placeHolder: '找調酒...'
}

export const Typing = Template.bind({})
Typing.args = {
  autoFocus: true,
  placeHolder: '找調酒...'
}
Typing.decorators = [
  story => {
    const setSearchBarInput = useStore(state => state.setSearchBarInput)
    setSearchBarInput('淡萊姆')
    return story()
  }
]

export const Filled = Template.bind({})
Filled.args = {
  placeHolder: '找調酒...'
}
Filled.decorators = [
  story => {
    const setSearchBarInput = useStore(state => state.setSearchBarInput)
    setSearchBarInput('淡萊姆')
    return story()
  }
]
