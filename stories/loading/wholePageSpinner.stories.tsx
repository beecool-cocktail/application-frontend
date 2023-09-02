import { ComponentMeta, ComponentStory } from '@storybook/react'
import WholePageSpinner from 'components/layout/wholePageSpinner'
import useWholePageSpinner from 'lib/application/ui/useWholePageSpinner'
import useOnce from 'lib/hooks/useOnce'

export default {
  title: 'status/Whole Page Spinner',
  component: WholePageSpinner,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=6850%3A11128&t=srMgrw2G1lyYqnPd-4'
    }
  }
} as ComponentMeta<typeof WholePageSpinner>

const Template: ComponentStory<typeof WholePageSpinner> = () => {
  return <WholePageSpinner />
}

export const Normal = Template.bind({})
Normal.decorators = [
  story => {
    const { setLoading } = useWholePageSpinner()
    useOnce(() => setLoading(true))
    return story()
  }
]
