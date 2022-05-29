import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Snackbar from 'components/common/snackbar/snackbar'
import useOnce from 'lib/hooks/useOnce'
import useStore from 'lib/services/storeAdapter'

export default {
  title: 'Snackbar/Snackbar',
  component: Snackbar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3753%3A8144'
    }
  }
} as ComponentMeta<typeof Snackbar>

const Template: ComponentStory<typeof Snackbar> = () => <Snackbar />

export const Normal = Template.bind({})
Normal.decorators = [
  story => {
    const toInitialState = useStore(state => state.toInitialState)
    useOnce(() =>
      toInitialState({
        snackbarOpen: true,
        snackbarMessage: '已存成草稿',
        snackbarDuration: null
      })
    )
    return story()
  }
]

export const Undo = Template.bind({})
Undo.decorators = [
  story => {
    const toInitialState = useStore(state => state.toInitialState)
    useOnce(() =>
      toInitialState({
        snackbarOpen: true,
        snackbarMessage: '已從收藏移除',
        snackbarDuration: 5000,
        snackbarOnUndo: () => {
          // eslint-disable-next-line no-console
          console.log('undo')
        }
      })
    )
    return story()
  }
]
