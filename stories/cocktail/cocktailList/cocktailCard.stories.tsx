import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CocktailCard from 'components/common/cocktailList/cocktailCard'
import CocktailSkeleton from 'components/common/cocktailList/cocktailSkeleton'
import { CocktailPostItem } from 'lib/domain/cocktail'
import mockPhotos, {
  mockBlurPhotos,
  mockFallbackPhotos
} from 'lib/mocks/data/photos'

export default {
  title: 'Cocktail/Cocktail Card/Cocktail Card Normal',
  component: CocktailCard,
  argTypes: {
    cocktail: { control: { type: 'object' } },
    onCollect: { action: 'onCollect' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2873%3A4549'
    }
  },
  decorators: [
    story => (
      <Box width={400} margin="0 auto">
        {story()}
      </Box>
    )
  ]
} as ComponentMeta<typeof CocktailCard>

const CocktailCardTemplate: ComponentStory<typeof CocktailCard> = args => (
  <CocktailCard {...args} />
)

const CocktailSkeletonTemplate: ComponentStory<
  typeof CocktailSkeleton
> = () => <CocktailSkeleton />

const defaultCocktail: CocktailPostItem = {
  id: 98078024211279,
  title: 'Old Fashioned',
  ingredients: [
    { name: '安格士苦精', amount: '3L' },
    { name: '橙皮', amount: '3L' }
  ],
  userId: 1,
  userName: 'Raven',
  isCollected: false,
  photos: mockPhotos
}

const fallbackPhotoCocktail: CocktailPostItem = {
  ...defaultCocktail,
  photos: mockFallbackPhotos
}
const blurPhotoCocktail: CocktailPostItem = {
  ...defaultCocktail,
  photos: mockBlurPhotos
}

const ellipsisCocktail = {
  ...defaultCocktail,
  title:
    '最大值30字標題，最大值30字標題，超過30字最後顯示這最大值30字標題，最大值30字標題超過30字最後顯示這',
  ingredients: [
    {
      name: '只要換行都要只要換行都要只要換行都要只只要換行都要只要換行都要只',
      amount: '3L'
    },
    {
      name: '白砂糖白砂糖白砂糖白砂糖白砂糖白砂糖白砂糖白白砂糖白砂糖白砂糖白砂糖白砂白',
      amount: '3L'
    },
    {
      name: '只要換行都要只要換行都要只要換行都要只只要換行都要只要換行都要只',
      amount: '3L'
    },
    {
      name: '白砂糖白砂糖白砂糖白砂糖白砂糖白砂糖白砂糖白白砂糖白砂糖白砂糖白砂糖白砂白',
      amount: '3L'
    },
    {
      name: '只要換行都要只要換行都要只要換行都要只只要換行都要只要換行都要只',
      amount: '3L'
    },
    {
      name: '白砂糖白砂糖白砂糖白砂糖白砂糖白砂糖白砂糖白白砂糖白砂糖白砂糖白砂糖白砂白',
      amount: '3L'
    }
  ],
  photos: mockPhotos
}

export const Default = CocktailCardTemplate.bind({})
Default.args = {
  cocktail: {
    ...defaultCocktail,
    isCollected: true
  }
}

export const Saved = CocktailCardTemplate.bind({})
Saved.args = {
  cocktail: {
    ...defaultCocktail,
    isCollected: true
  }
}

export const Ellipsis = CocktailCardTemplate.bind({})
Ellipsis.args = {
  cocktail: ellipsisCocktail
}

export const WithoutUploadPhoto = CocktailCardTemplate.bind({})
WithoutUploadPhoto.args = {
  cocktail: fallbackPhotoCocktail
}

export const Blur = CocktailCardTemplate.bind({})
Blur.args = {
  cocktail: blurPhotoCocktail
}

export const Skeleton = CocktailSkeletonTemplate.bind({})
