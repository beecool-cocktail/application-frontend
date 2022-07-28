import { useState } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import DraftCard from 'components/pages/draft/draftCard'
import { CocktailPostDraftItem } from 'lib/domain/cocktail'
import { mockFallbackPhotos } from 'lib/mocks/data/photos'

export default {
  title: 'Cocktail/Cocktail Card/Draft Card',
  component: DraftCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=5141%3A10117'
    }
  }
} as ComponentMeta<typeof DraftCard>

const Template: ComponentStory<typeof DraftCard> = args => {
  const [selected, setSelected] = useState(args.selected || false)
  return <DraftCard {...args} selected={selected} onCheck={setSelected} />
}

const draftWithoutDescription: CocktailPostDraftItem = {
  id: 1,
  title: '經典威士忌經典經典威士',
  description: '',
  coverPhotoUrl: mockFallbackPhotos[0].path
}

const draftWithDescription: CocktailPostDraftItem = {
  ...draftWithoutDescription,
  description: '關於威士忌的起源有點關於威士忌'
}

export const DefaultWithDescription = Template.bind({})
DefaultWithDescription.args = {
  draft: draftWithDescription,
  isEditMode: false,
  selected: false
}

export const EditWithDescription = Template.bind({})
EditWithDescription.args = {
  draft: draftWithDescription,
  isEditMode: true,
  selected: false
}

export const DefaultWithoutDescription = Template.bind({})
DefaultWithoutDescription.args = {
  draft: draftWithoutDescription,
  isEditMode: false,
  selected: false
}

export const EditWithoutDescription = Template.bind({})
EditWithoutDescription.args = {
  draft: draftWithoutDescription,
  isEditMode: true,
  selected: false
}
