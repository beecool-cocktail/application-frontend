import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box, Typography } from '@mui/material'
import ActionSheet from 'components/common/postEditor/actionSheet'
import EditIcon from 'lib/assets/editOutlined.svg'
import ReloadIcon from 'lib/assets/reloadBlueBg.svg'
import PinIcon from 'lib/assets/pictureBlueBg.svg'
import TrashIcon from 'lib/assets/trashOutlined.svg'
import theme from 'lib/application/configs/theme'

export default {
  title: 'PostCreate/Action Sheet',
  component: ActionSheet,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=7630%3A19210&t=H0boGFEg1imsRkiS-4'
    }
  }
} as ComponentMeta<typeof ActionSheet>

const Template: ComponentStory<typeof ActionSheet> = args => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ bgcolor: theme.palette.background.default }}
    >
      <ActionSheet {...args} />
      <Typography>Hello</Typography>
    </Box>
  )
}

const handleClick = () => {
  // TODO
}

export const Cover = Template.bind({})
Cover.args = {
  topOffset: 230,
  actions: [
    { text: '重新上傳', icon: <EditIcon />, onClick: handleClick },
    { text: '編輯照片', icon: <ReloadIcon />, onClick: handleClick },
    { text: '刪除照片', icon: <TrashIcon />, onClick: handleClick }
  ]
}

export const OthersSmallOffset = Template.bind({})
OthersSmallOffset.args = {
  topOffset: 229,
  actions: [
    { text: '重新上傳', icon: <EditIcon />, onClick: handleClick },
    { text: '編輯照片', icon: <ReloadIcon />, onClick: handleClick },
    { text: '換成封面', icon: <PinIcon />, onClick: handleClick },
    { text: '刪除照片', icon: <TrashIcon />, onClick: handleClick }
  ]
}

export const OthersNormalOffset = Template.bind({})
OthersNormalOffset.args = {
  topOffset: 230,
  actions: [
    { text: '重新上傳', icon: <EditIcon />, onClick: handleClick },
    { text: '編輯照片', icon: <ReloadIcon />, onClick: handleClick },
    { text: '換成封面', icon: <PinIcon />, onClick: handleClick },
    { text: '刪除照片', icon: <TrashIcon />, onClick: handleClick }
  ]
}
