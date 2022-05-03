import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'
import CocktailList from 'components/common/cocktailList/cocktailList'
import mockCocktail from 'lib/mocks/data/cocktail'
import { configHandler, responseJson } from 'lib/mocks/handlers'
import { GetPopularCocktailListResponse } from 'sdk'

export default {
  title: 'cocktailList/Cocktail List',
  component: CocktailList,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2560%3A5124'
    }
  }
} as ComponentMeta<typeof CocktailList>

const Template: ComponentStory<typeof CocktailList> = () => {
  return (
    <Box width={400} margin="0 auto">
      <CocktailList />
    </Box>
  )
}

export const DefaultBehavior = Template.bind({})

DefaultBehavior.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/cocktails', (req, res, ctx) => {
        const data: GetPopularCocktailListResponse = {
          popular_cocktail_list: [
            {
              ...mockCocktail,
              cocktail_id: 1,
              photos: [
                'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505',
                'https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?fit=1200%2C879&ssl=1',
                'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg'
              ]
            },
            {
              ...mockCocktail,
              cocktail_id: 2,
              photos: [
                'https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?fit=1200%2C879&ssl=1',
                'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505',
                'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg'
              ]
            },
            {
              ...mockCocktail,
              cocktail_id: 3,
              photos: [
                'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg',
                'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505',
                'https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?fit=1200%2C879&ssl=1'
              ]
            }
          ],
          total: 3
        }
        return responseJson(res, ctx, data)
      })
    ]
  }
}

export const FirstVisit = Template.bind({})
FirstVisit.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/cocktails', (req, res, ctx) => res(ctx.delay('infinite')))
    ]
  }
}

export const LoadingMoreDataOnScroll = Template.bind({})
export const PullToRefresh = Template.bind({})
export const LinearIndicator = Template.bind({})
export const NoMoreData = Template.bind({})
export const Retry = Template.bind({})
Retry.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/cocktails', (req, res, ctx) =>
        res(ctx.status(500), ctx.delay(1000))
      )
    ]
  }
}
