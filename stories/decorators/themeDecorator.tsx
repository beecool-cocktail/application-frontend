import { ThemeProvider } from '@mui/system'
import { CssBaseline } from '@mui/material'
import { DecoratorFn } from '@storybook/react'
import theme from 'lib/application/configs/theme'

const themeDecorator: DecoratorFn = Story => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
)

export default themeDecorator
