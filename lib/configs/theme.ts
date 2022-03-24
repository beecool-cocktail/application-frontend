import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    red: Palette['primary']
    yellow: Palette['primary']
    blue: Palette['primary']
    green: Palette['primary']
    dark1: Palette['primary']
    dark2: Palette['primary']
    dark3: Palette['primary']
    dark4: Palette['primary']
    dark5: Palette['primary']
    dark6: Palette['primary']
    light1: Palette['primary']
    light2: Palette['primary']
    light3: Palette['primary']
    light4: Palette['primary']
    white: Palette['primary']
    black: Palette['primary']
  }
  interface PaletteOptions {
    red: PaletteOptions['primary']
    yellow: PaletteOptions['primary']
    blue: PaletteOptions['primary']
    green: PaletteOptions['primary']
    dark1: PaletteOptions['primary']
    dark2: PaletteOptions['primary']
    dark3: PaletteOptions['primary']
    dark4: PaletteOptions['primary']
    dark5: PaletteOptions['primary']
    dark6: PaletteOptions['primary']
    light1: PaletteOptions['primary']
    light2: PaletteOptions['primary']
    light3: PaletteOptions['primary']
    light4: PaletteOptions['primary']
    white: PaletteOptions['primary']
    black: PaletteOptions['primary']
  }
  interface PaletteColor {
    lighter?: string
    darker?: string
    subtle?: string
  }
  interface SimplePaletteColorOptions {
    lighter?: string
    darker?: string
    subtle?: string
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FBF9F6',
      darker: '#053FB0',
      lighter: '0D85FF',
      subtle: '#21DAFF'
    },
    red: { main: '#FF3B30' },
    yellow: { main: '#FFCC00' },
    blue: { main: '#007AFF' },
    green: { main: '#34C759' },
    dark1: { main: '#000000' },
    dark2: { main: '#0D0D0D' },
    dark3: { main: '#141414' },
    dark4: { main: '#1C1C1C' },
    dark5: { main: '#262626' },
    dark6: { main: '#292929' },
    light1: { main: '#EBEBEB' },
    light2: { main: '#CCCCCC' },
    light3: { main: '#A0A0A0' },
    light4: { main: '#7B7B7B' },
    white: { main: '#DBE0EC' },
    black: { main: '#131924' }
  },
  typography: {
    fontFamily: ['Noto Sans TC', 'Helvetica Neue', 'Arial', 'sans-serif'].join(
      ','
    )
  }
})

export default theme
