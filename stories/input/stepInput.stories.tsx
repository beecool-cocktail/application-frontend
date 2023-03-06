import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'
import StepInput from 'components/common/postEditor/stepInput'
import { CocktailPostStep1Form } from 'lib/domain/cocktail'

export default {
  title: 'input/Post Editor/Step Input',
  component: StepInput,
  argTypes: {
    name: { type: 'string' },
    disabled: { type: 'boolean' },
    height: { type: 'number' },
    onRemove: { action: 'remove' }
  }
} as ComponentMeta<typeof StepInput>

const Template: ComponentStory<typeof StepInput> = args => {
  const { control } = useForm<CocktailPostStep1Form>()
  return <StepInput {...args} name="steps.1.description" control={control} />
}

export const Normal = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
  removeDisabled: true
}
