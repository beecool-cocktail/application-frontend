import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'
import { move } from 'ramda'
import CocktailList from 'components/common/cocktailList/cocktailList'
import mockCocktail from 'lib/mocks/data/cocktail'
import { configHandler, responseJson } from 'lib/mocks/handlers'
import { GetPopularCocktailListResponse, PopularCocktailList } from 'sdk'
import mockPhotos from 'lib/mocks/data/photos'

export default {
  title: 'Cocktail/Cocktail List/Normal Cocktail List',
  component: CocktailList,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2560%3A5124'
    }
  }
} as ComponentMeta<typeof CocktailList>

const generateMockCocktail = (id: number): PopularCocktailList => {
  let photos = mockPhotos
  for (let i = 0; i < id % 3; i++) photos = move(0, -1, photos)
  return {
    ...mockCocktail,
    cocktail_id: id,
    photos: photos.map(p => p.path),
    low_quality_photos: photos.map(p => p.blurPath)
  }
}

const generateMockCocktailList = (pageIndex: number, pageSize: number) => {
  const start = (pageIndex - 1) * pageSize + 1
  const end = start + pageSize
  const list: PopularCocktailList[] = []
  for (let id = start; id < end; id++) list.push(generateMockCocktail(id))
  return list
}

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
          popular_cocktail_list: generateMockCocktailList(
            Number(req.url.searchParams.get('page')),
            Number(req.url.searchParams.get('page_size'))
          ),
          total: 1000
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

export const NoMoreData = Template.bind({})
NoMoreData.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/cocktails', (req, res, ctx) => {
        const data: GetPopularCocktailListResponse = {
          popular_cocktail_list: generateMockCocktailList(1, 2),
          total: 2
        }
        return responseJson(res, ctx, data)
      })
    ]
  }
}

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
