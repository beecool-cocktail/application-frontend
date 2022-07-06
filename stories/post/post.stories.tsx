import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Post from 'components/common/post/post'
import PostSkeleton from 'components/common/post/postSkeleton'

export default {
  title: 'post/Post',
  component: Post,
  argTypes: {
    onCollect: { action: 'collect' }
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    }
  }
} as ComponentMeta<typeof Post>

const Template: ComponentStory<typeof Post> = args => {
  return <Post {...args} />
}

const SkeletonTemplate: ComponentStory<typeof PostSkeleton> = () => (
  <PostSkeleton />
)

export const Default = Template.bind({})
Default.args = {
  cocktailPost: {
    id: 1,
    userId: 1234,
    userName: '剛之鍊金術師剛之鍊金術師鍊剛之金術師剛之',
    userPhoto: 'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg',
    title: '經典威士忌經典經典威士忌經典經典威士忌經',
    description:
      '關於威士忌的起源有點模糊，沒有精準的時點，但一般公認是受到世紀鍊金術影響。據說在一個偶然的機會下，煉金術師將某種發酵液體放進煉金術用的溶爐中，發現竟然會產生可口的液體，這便是人類初次獲得蒸餾酒的初體驗。當時，鍊金術師將蒸餾酒當作維持生命的祕藥，就把這種酒用拉丁語稱作Aquavitae（生命之水），可以使人長生不老。',
    photos: [],
    ingredients: [
      { name: '波本威士忌', amount: '600 ml' },
      { name: '安格士苦精', amount: '5 ml' },
      { name: '白砂糖', amount: '10 g' },
      { name: '橙皮', amount: '5 g' }
    ],
    steps: [
      {
        description:
          'Cut your lime ready for squeezing and garnish Cut your lime ready for squeezing and garnish'
      },
      { description: 'Fill your highball glass with cubed ice' },
      { description: 'Pour in the gin and lime juice' },
      { description: 'Top up with soda water' },
      {
        description:
          '我是測試的我是測試的我是測試的我是測試的我是測試的我是測試的我是測試的我是測試的我是測試的我是測試的'
      }
    ],
    isCollected: false,
    createdDate: '2022-01-01'
  }
}

export const Skeleton = SkeletonTemplate.bind({})
