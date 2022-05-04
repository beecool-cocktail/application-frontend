import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CocktailCard from 'components/common/cocktailList/cocktailCard'
import CocktailSkeleton from 'components/common/cocktailList/cocktailSkeleton'

export default {
  title: 'cocktailList/Cocktail Card',
  component: CocktailCard,
  argTypes: {
    cocktail: { control: { type: 'object' } },
    onCollect: { action: 'onCollect' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2560%3A5124'
    }
  }
} as ComponentMeta<typeof CocktailCard>

const CocktailCardTemplate: ComponentStory<typeof CocktailCard> = args => (
  <Box width={400} margin="0 auto">
    <CocktailCard {...args} />
  </Box>
)

const CocktailSkeletonTemplate: ComponentStory<
  typeof CocktailSkeleton
> = () => (
  <Box width={400} margin="0 auto">
    <CocktailSkeleton />
  </Box>
)

const defaultCocktail = {
  id: 98078024211279,
  title: 'Old Fashioned',
  ingredients: [
    { name: '安格士苦精', amount: '3L' },
    { name: '橙皮', amount: '3L' }
  ],
  userId: 1,
  userName: 'Raven',
  isCollected: false,
  photoUrls: [
    'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505',
    'https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?fit=1200%2C879&ssl=1',
    'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg'
  ]
}

const onePhotoCocktail = {
  ...defaultCocktail,
  photoUrls: [
    'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505'
  ]
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
  photoUrls: [
    'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505',
    'https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?fit=1200%2C879&ssl=1',
    'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg'
  ]
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

export const OnePhoto = CocktailCardTemplate.bind({})
OnePhoto.args = {
  cocktail: onePhotoCocktail
}

export const Skeleton = CocktailSkeletonTemplate.bind({})
