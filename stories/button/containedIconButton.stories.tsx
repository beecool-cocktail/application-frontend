import React from 'react'
import { Box, Stack } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ContainedIconButton from 'components/common/button/containedIconButton'
// import BackIcon from 'lib/assets/backReturnOutlined.svg'
import BackBgIcon from 'lib/assets/backReturnGrayBgOutlined.svg'
// import ShareIcon from 'lib/assets/shareOutlined.svg'
import ShareBgIcon from 'lib/assets/shareGrayBgOutlined.svg'
// import EditIcon from 'lib/assets/editOutlined.svg'
import EditBgIcon from 'lib/assets/editGrayBgOutlined.svg'

export default {
  title: 'button/Contained Icon Button',
  component: ContainedIconButton,
  argTypes: {
    onClick: { action: 'click' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=8398%3A24589&t=YxVj1MAEFPTKhVNF-4'
    }
  }
} as ComponentMeta<typeof ContainedIconButton>

const Template: ComponentStory<typeof ContainedIconButton> = args => {
  const bgIcons = [BackBgIcon, EditBgIcon, ShareBgIcon]
  // const normalIcons = [BackIcon, EditIcon, ShareIcon]

  return (
    <Stack gap="8px">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: 1
        }}
      >
        {bgIcons.map((Icon, i) => (
          <ContainedIconButton key={i} {...args}>
            <Icon />
          </ContainedIconButton>
        ))}
      </Box>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: 1
        }}
      >
        {normalIcons.map((Icon, i) => (
          <ContainedIconButton key={i} {...args}>
            <Icon />
          </ContainedIconButton>
        ))}
      </Box> */}
    </Stack>
  )
}

export const Normal = Template.bind({})
Normal.args = {
  size: 24,
  disabled: false
}
