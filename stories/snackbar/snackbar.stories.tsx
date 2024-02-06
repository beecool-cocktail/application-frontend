import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Snackbar from 'components/common/snackbar/snackbar'
import useOnce from 'lib/utils/hooks/useOnce'
import useSnackbar from 'lib/application/hooks/ui/useSnackbar'
import snackbarMessages from 'lib/application/constants/snackbarMessages'

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
    const snackbar = useSnackbar()
    useOnce(() => {
      snackbar.success(snackbarMessages.createDraft.success, 3000, () => {
        // eslint-disable-next-line no-console
        console.log('click')
      })
    })
    return story()
  }
]

export const Undo = Template.bind({})
Undo.decorators = [
  story => {
    const snackbar = useSnackbar()
    useOnce(() => {
      snackbar.success(
        snackbarMessages.removeFavorite.success,
        5000,
        // eslint-disable-next-line no-console
        () => console.log('click'),
        // eslint-disable-next-line no-console
        () => console.log('undo')
      )
    })
    return story()
  }
]
