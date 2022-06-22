import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Post from 'components/common/post/post'

export default {
  title: 'post/Post',
  component: Post,
  argTypes: {
    onCollect: { action: 'collect' }
  },
  decorators: [
    storyFn => (
      <div style={{ transform: 'scale(1)', height: '100vh' }}>{storyFn()}</div>
    )
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    }
  }
} as ComponentMeta<typeof Post>

const Template: ComponentStory<typeof Post> = args => {
  return <Post {...args} />
}

export const PrimaryDefault = Template.bind({})
PrimaryDefault.args = {
  cocktailPost: {
    id: 1,
    userId: 1,
    userName: 'Raven',
    userPhoto: 'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg',
    title: 'Old Fashioned',
    description: `Aut sunt nulla molestiae. Culpa iusto odio ut quas voluptas. Ex ut optio eius officia aliquid error quo. Vel aut quam molestiae nisi sit perferendis. Quia impedit quasi voluptatem expedita.
 
Recusandae reiciendis delectus voluptatibus ratione veritatis et soluta. Ad debitis corporis neque tenetur excepturi officia. Molestiae ipsam maxime neque rerum nam sunt aspernatur saepe sunt. Qui ipsa dicta eaque et ratione veritatis quam. Itaque cumque similique aliquam perspiciatis.`,
    photos: [],
    ingredients: [
      { name: '波本或裸麥威士忌', amount: '3L' },
      { name: '方糖', amount: '3L' },
      { name: '安格氏苦精', amount: '3L' }
    ],
    steps: [
      { description: 'Step 1' },
      { description: 'Step 2' },
      { description: 'Step 3' },
      { description: 'Step 1' },
      { description: 'Step 2' },
      { description: 'Step 3' },
      { description: 'Step 1' },
      { description: 'Step 2' },
      { description: 'Step 3' },
      { description: 'Step 1' },
      { description: 'Step 2' },
      { description: 'Step 3' }
    ],
    isCollected: false,
    createdDate: '2022-01-01'
  }
}
