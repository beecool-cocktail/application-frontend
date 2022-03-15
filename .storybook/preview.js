import { initialize, mswDecorator } from 'msw-storybook-addon'
import 'lib/styles/globals.css'
import 'lib/styles/swiper.css'

initialize()

export const decorators = [mswDecorator]
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
