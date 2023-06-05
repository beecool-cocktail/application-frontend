import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import IconButton from 'components/common/button/iconButton'
import AddIcon from '/lib/assets/plusAddOutlined.svg'
import BackIcon from 'lib/assets/backReturnOutlined.svg'
import ConfirmIcon from 'lib/assets/confirmOutlined.svg'
import ShareIcon from 'lib/assets/shareOutlined.svg'
import DeleteIcon from 'lib/assets/deleteInputOutlined.svg'
import TrashIcon from 'lib/assets/trashOutlined.svg'
import SettingIcon from 'lib/assets/settingOutlined.svg'
import DraftIcon from 'lib/assets/draftOutlined.svg'
import EditIcon from 'lib/assets/editOutlined.svg'
import LikeIcon from 'lib/assets/like.svg'

export default {
  title: 'button/Icon Button',
  component: IconButton,
  argTypes: {
    onClick: { action: 'click' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=8398%3A24589&t=YxVj1MAEFPTKhVNF-4'
    }
  }
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = args => {
  const icons = [
    BackIcon,
    AddIcon,
    DeleteIcon,
    EditIcon,
    ShareIcon,
    DraftIcon,
    SettingIcon,
    TrashIcon,
    ConfirmIcon,
    LikeIcon
  ]
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 1
      }}
    >
      {icons.map((Icon, i) => (
        <IconButton key={i} {...args}>
          <Icon />
        </IconButton>
      ))}
    </Box>
  )
}

export const Normal = Template.bind({})
Normal.args = {
  disabled: false,
  active: false
}
