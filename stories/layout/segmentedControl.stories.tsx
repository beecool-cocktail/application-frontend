import { useState } from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import SegmentedControl from 'components/pages/profile/segmentedControl'

export default {
  title: 'Layout/Segmented Control',
  component: SegmentedControl,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=4607%3A11980'
    }
  }
} as ComponentMeta<typeof SegmentedControl>

const Template: ComponentStory<typeof SegmentedControl> = args => {
  const [tabIndex, setTabIndex] = useState(args.tabIndex)
  return (
    <Box sx={{ width: 375 }}>
      <SegmentedControl
        {...args}
        tabIndex={tabIndex}
        onChange={(_e, tabIndex) => setTabIndex(tabIndex)}
      />
    </Box>
  )
}

export const MyPosts = Template.bind({})
MyPosts.args = {
  tabs: ['我的發文', '收藏文章'],
  tabIndex: 0
}

export const MyCollection = Template.bind({})
MyCollection.args = {
  tabs: ['我的發文', '收藏文章'],
  tabIndex: 1
}
