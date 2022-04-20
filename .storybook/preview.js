import { initialize, mswDecorator } from 'msw-storybook-addon'
import '@fontsource/noto-sans-tc/400.css'
import '@fontsource/noto-sans-tc/500.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/800.css'
import 'lib/styles/globals.css'
import 'lib/styles/swiper.css'
import themeDecorator from 'stories/decorators/themeDecorator'
import storeDecorator from 'stories/decorators/storeDecorator'
import loggedOutDecorator from 'stories/decorators/loggedOutDecorator'
import SWRConfigDecorator from 'stories/decorators/SWRConfigDecorator'

initialize({ onUnhandledRequest: 'bypass' })

export const decorators = [
  mswDecorator,
  themeDecorator,
  storeDecorator,
  loggedOutDecorator,
  SWRConfigDecorator
]
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
