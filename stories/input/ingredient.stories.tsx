import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'
import IngredientInput from 'components/common/postEditor/ingredientInput'
import { CocktailPostForm } from 'lib/application/ports'

export default {
  title: 'input/Ingredient Input',
  component: IngredientInput,
  argTypes: {
    disabled: { type: 'boolean' },
    onRemove: { action: 'remove' }
  }
} as ComponentMeta<typeof IngredientInput>

const Template: ComponentStory<typeof IngredientInput> = args => {
  const { control } = useForm<CocktailPostForm>()
  return (
    <IngredientInput
      {...args}
      ingredientName="ingredients.1.name"
      amountName="ingredients.1.amount"
      control={control}
    />
  )
}

export const Normal = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
  removeDisabled: true
}
