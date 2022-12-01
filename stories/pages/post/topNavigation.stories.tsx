import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box, Typography } from '@mui/material'
import TopNavigation from 'components/layout/topNavigation'
import IconButton from 'components/common/button/iconButton'
import DraftIcon from 'lib/assets/draftOutlined.svg'
import TrashIcon from 'lib/assets/trashOutlined.svg'
import SettingIcon from 'lib/assets/settingOutlined.svg'
import ShareIcon from 'lib/assets/shareOutlined.svg'
import EditIcon from 'lib/assets/editOutlined.svg'
import BackButton from 'components/common/button/backButton'

export default {
  title: 'layout/TopNavigation',
  component: TopNavigation,
  argTypes: {
    position: { type: 'string' },
    thresholdHeight: { type: 'number' }
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    }
  }
} as ComponentMeta<typeof TopNavigation>

const Template: ComponentStory<typeof TopNavigation> = args => {
  return (
    <Box
      sx={{
        height: '200vh',
        backgroundColor: theme => theme.palette.dark6.main
      }}
    >
      <TopNavigation {...args} />
    </Box>
  )
}

export const RightIconWithoutTitle = Template.bind({})
RightIconWithoutTitle.args = {
  rightSlot: () => (
    <>
      <IconButton>
        <DraftIcon />
      </IconButton>
      <IconButton>
        <SettingIcon />
      </IconButton>
    </>
  )
}

export const LeftIconWithoutTitle = Template.bind({})
LeftIconWithoutTitle.args = {
  leftSlot: () => <BackButton />
}

export const RightTextLeftIconWithoutTitle = Template.bind({})
RightTextLeftIconWithoutTitle.args = {
  leftSlot: () => <BackButton />,
  rightSlot: () => (
    <Typography variant="body2" color={theme => theme.palette.light4.main}>
      Text
    </Typography>
  )
}

export const LeftIconWithTitle = Template.bind({})
LeftIconWithTitle.args = {
  leftSlot: () => <BackButton />,
  title: () => 'Title'
}

export const RightTextLeftIconWithTitle = Template.bind({})
RightTextLeftIconWithTitle.args = {
  leftSlot: () => <BackButton />,
  title: () => 'Title',
  rightSlot: () => (
    <Typography variant="body2" color={theme => theme.palette.light4.main}>
      Text
    </Typography>
  )
}

export const RightIconLeftIconWithTitle = Template.bind({})
RightIconLeftIconWithTitle.args = {
  leftSlot: () => <BackButton />,
  title: () => 'Title',
  rightSlot: () => (
    <IconButton>
      <TrashIcon />
    </IconButton>
  )
}

export const RightIconLeftTextWithTitle = Template.bind({})
RightIconLeftTextWithTitle.args = {
  leftSlot: () => (
    <Typography variant="body2" color={theme => theme.palette.light4.main}>
      Text
    </Typography>
  ),
  title: () => 'Title',
  rightSlot: () => (
    <IconButton>
      <TrashIcon />
    </IconButton>
  )
}

export const RightIconLeftIconWithoutTitle = Template.bind({})
RightIconLeftIconWithoutTitle.args = {
  leftSlot: () => <BackButton />,
  rightSlot: () => (
    <>
      <IconButton>
        <ShareIcon />
      </IconButton>
      <IconButton>
        <EditIcon />
      </IconButton>
    </>
  )
}
