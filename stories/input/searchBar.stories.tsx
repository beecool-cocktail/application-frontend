/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import SearchBar from 'components/common/input/searchBar'
import useSearchBarInner from 'lib/application/hooks/ui/useSearchBarInner'

export default {
  title: 'input/Search Bar',
  argTypes: {
    placeholder: { type: 'string' },
    onClick: { action: 'click' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2873%3A4420'
    }
  }
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = args => {
  return <SearchBar {...args} />
}

export const Default = Template.bind({})
Default.args = {
  placeholder: '找調酒...'
}

export const Selected = Template.bind({})
Selected.args = {
  ...Default.args,
  autoFocus: true
}

export const Filled = Template.bind({})
Filled.args = {
  ...Default.args
}
Filled.decorators = [
  story => {
    const { setInput } = useSearchBarInner()
    useEffect(() => {
      setInput('淡萊姆')
    }, [setInput])
    return story()
  }
]

export const Typing = Template.bind({})
Typing.args = {
  ...Default.args,
  autoFocus: true
}
Typing.decorators = [...Filled.decorators]
