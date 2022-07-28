import { useState } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Checkbox from 'components/common/input/checkbox'

export default {
  title: 'Input/Checkbox',
  component: Checkbox
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = args => {
  const [checked, setChecked] = useState(args.checked || false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setChecked(event.target.checked)
  return <Checkbox {...args} checked={checked} onChange={handleChange} />
}

export const Normal = Template.bind({})
Normal.args = { checked: false }

export const Active = Template.bind({})
Active.args = { checked: true }
