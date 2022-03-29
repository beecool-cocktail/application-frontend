import { initialize, mswDecorator } from 'msw-storybook-addon'
import { ThemeProvider } from '@mui/system'
import { CssBaseline } from '@mui/material'
import '@fontsource/noto-sans-tc/400.css'
import '@fontsource/noto-sans-tc/500.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/800.css'
import theme from '../lib/configs/theme'
import 'lib/styles/globals.css'
import 'lib/styles/swiper.css'

initialize()

const themeDecorator = Story => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
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
