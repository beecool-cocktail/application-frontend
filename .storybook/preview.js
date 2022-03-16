import { initialize, mswDecorator } from 'msw-storybook-addon'
import { ThemeProvider } from '@mui/system'
import theme from '../lib/configs/theme'
import 'lib/styles/globals.css'
import 'lib/styles/swiper.css'

initialize()

const themeDecorator = Story => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
)

export const decorators = [mswDecorator, themeDecorator]
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
