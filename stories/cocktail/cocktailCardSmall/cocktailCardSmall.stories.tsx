/* eslint-disable no-console */
import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CocktailCardSmall from 'components/common/cocktailCardSmall/cocktailCardSmall'
import CocktailCardSmallSkeleton from 'components/common/cocktailCardSmall/cocktailCardSmallSkeleton'
import { mockFallbackPhotos } from 'lib/mocks/data/photos'

export default {
  title: 'Cocktail/Cocktail Card/Cocktail Card Small',
  component: CocktailCardSmall,
  argTypes: {
    cocktail: { control: { type: 'object' } },
    onRemove: { action: 'remove' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=4613%3A11271'
    }
  },
  decorators: [
    story => (
      <Box margin="0 auto" width="176px" height="171px">
        {story()}
      </Box>
    )
  ]
} as ComponentMeta<typeof CocktailCardSmall>

const Template: ComponentStory<typeof CocktailCardSmall> = args => (
  <CocktailCardSmall {...args} />
)

const SkeletonTemplate: ComponentStory<
  typeof CocktailCardSmallSkeleton
> = () => <CocktailCardSmallSkeleton />

const mockCocktail = {
  id: 98078024211279,
  title: 'Old Fashion',
  userName: 'Raven',
  photoUrl:
    'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505'
}

export const Default = Template.bind({})
Default.args = {
  cocktail: mockCocktail,
  actions: [
    { text: '分享貼文', onClick: () => console.log('share') },
    { text: '收藏貼文', onClick: () => console.log('favorite') }
  ]
}

export const Ellipsis = Template.bind({})
Ellipsis.args = {
  cocktail: { ...mockCocktail, title: 'Old Fashion 經典威士忌超過' },
  actions: [
    { text: '分享貼文', onClick: () => console.log('share') },
    { text: '收藏貼文', onClick: () => console.log('favorite') }
  ]
}

export const MyCocktailOptions = Template.bind({})
MyCocktailOptions.args = {
  cocktail: mockCocktail,
  actions: [
    { text: '刪除貼文', onClick: () => console.log('delete') },
    { text: '編輯貼文', onClick: () => console.log('edit') }
  ],
  defaultEditMode: true
}

export const NormalOptions = Template.bind({})
NormalOptions.args = {
  cocktail: mockCocktail,
  actions: [
    { text: '分享貼文', onClick: () => console.log('share') },
    { text: '收藏貼文', onClick: () => console.log('favorite') }
  ],
  defaultEditMode: true
}

export const SavedOptions = Template.bind({})
SavedOptions.args = {
  cocktail: mockCocktail,
  actions: [
    { text: '分享貼文', onClick: () => console.log('share') },
    { text: '移除收藏', onClick: () => console.log('favorite') }
  ],
  defaultEditMode: true
}

export const WithoutUploadPhoto = Template.bind({})
WithoutUploadPhoto.args = {
  cocktail: { ...mockCocktail, photoUrl: mockFallbackPhotos[0].path },
  actions: [
    { text: '分享貼文', onClick: () => console.log('share') },
    { text: '移除收藏', onClick: () => console.log('favorite') }
  ]
}

export const Skeleton = SkeletonTemplate.bind({})
