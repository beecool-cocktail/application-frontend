import { ComponentMeta, ComponentStory } from '@storybook/react'
import SettingItem from 'components/pages/settings/settingItem'
import CameraIcon from 'lib/assets/cameraOutlined.svg'
import DeleteIcon from 'lib/assets/deleteAvatarOutlined.svg'
import LikeIcon from 'lib/assets/likeSettingPageOutlined.svg'

export default {
  title: 'Profile/Setting Item',
  component: SettingItem
} as ComponentMeta<typeof SettingItem>

const Template: ComponentStory<typeof SettingItem> = args => {
  return <SettingItem {...args} />
}

export const Normal = Template.bind({})
Normal.args = {
  actionType: 'normal',
  icon: <DeleteIcon />,
  text: '刪除大頭貼'
}

export const Link = Template.bind({})
Link.args = {
  actionType: 'link',
  icon: <CameraIcon />,
  text: '更換大頭貼'
}

export const Switch = Template.bind({})
Switch.args = {
  actionType: 'switch',
  icon: <LikeIcon />,
  text: '公開我的收藏'
}

export const Danger = Template.bind({})
Danger.args = {
  actionType: 'danger',
  icon: <CameraIcon />,
  text: '登出'
}
