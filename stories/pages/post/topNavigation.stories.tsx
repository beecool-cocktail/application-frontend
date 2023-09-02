import React from 'react'
import Image from 'next/image'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box, Typography } from '@mui/material'
import TopNavigation, {
  TopNavigationProps
} from 'components/layout/topNavigation'
import IconButton from 'components/common/button/iconButton'
import DraftIcon from 'lib/assets/draftOutlined.svg'
import TrashIcon from 'lib/assets/trashOutlined.svg'
import SettingIcon from 'lib/assets/settingOutlined.svg'
import ShareIcon from 'lib/assets/shareOutlined.svg'
import EditIcon from 'lib/assets/editOutlined.svg'
import BackButton from 'components/common/button/backButton'

export default {
  title: 'layout/Top Navigation',
  component: TopNavigation,
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['static', 'fixed', 'sticky']
    },
    thresholdHeight: { type: 'number' }
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=6677%3A10809&t=eaOZmKnag7Ug7i3E-4'
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
      <Box>
        <Image
          layout="responsive"
          width={400}
          height={300}
          src="/cocktail-2.jpg"
          alt="image"
        />
      </Box>
    </Box>
  )
}

const baseArgs: Partial<TopNavigationProps> = {
  position: 'sticky',
  thresholdHeight: 1
}

export const RightIconWithoutTitle = Template.bind({})
RightIconWithoutTitle.args = {
  ...baseArgs,
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
  ...baseArgs,
  leftSlot: () => <BackButton />
}

export const RightTextLeftIconWithoutTitle = Template.bind({})
RightTextLeftIconWithoutTitle.args = {
  ...baseArgs,
  leftSlot: () => <BackButton />,
  rightSlot: () => (
    <Typography variant="body2" color={theme => theme.palette.light4.main}>
      Text
    </Typography>
  )
}

export const LeftIconWithTitle = Template.bind({})
LeftIconWithTitle.args = {
  ...baseArgs,
  leftSlot: () => <BackButton />,
  title: 'Title'
}

export const RightTextLeftIconWithTitle = Template.bind({})
RightTextLeftIconWithTitle.args = {
  ...baseArgs,
  leftSlot: () => <BackButton />,
  title: 'Title',
  rightSlot: () => (
    <Typography variant="body2" color={theme => theme.palette.light4.main}>
      Text
    </Typography>
  )
}

export const RightIconLeftIconWithTitle = Template.bind({})
RightIconLeftIconWithTitle.args = {
  ...baseArgs,
  leftSlot: () => <BackButton />,
  title: 'Title',
  rightSlot: () => (
    <IconButton>
      <TrashIcon />
    </IconButton>
  )
}

export const RightIconLeftTextWithTitle = Template.bind({})
RightIconLeftTextWithTitle.args = {
  ...baseArgs,
  leftSlot: () => (
    <Typography variant="body2" color={theme => theme.palette.light1.main}>
      Text
    </Typography>
  ),
  title: 'Title',
  rightSlot: () => (
    <IconButton>
      <TrashIcon />
    </IconButton>
  )
}

export const RightIconLeftIconWithoutTitle = Template.bind({})
RightIconLeftIconWithoutTitle.args = {
  ...baseArgs,
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
