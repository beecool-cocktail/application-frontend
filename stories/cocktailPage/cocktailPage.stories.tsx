import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CocktailPage from 'pages/cocktails/[id]'
import { storybookHandlers } from 'lib/mocks/handlers'

export default {
  title: 'cocktailPage/Cocktail Page',
  component: CocktailPage,
  argTypes: {}
} as ComponentMeta<typeof CocktailPage>

const Template: ComponentStory<typeof CocktailPage> = args => {
  return (
    <Box width={400} margin="0 auto">
      <CocktailPage {...args} />
    </Box>
  )
}

export const Normal = Template.bind({})

Normal.parameters = {
  msw: { handlers: storybookHandlers },
  nextRouter: {
    path: '/cocktails/[id]',
    asPath: '/cocktails/1',
    query: { id: '1' }
  }
}
