import { createTheme } from '@mui/material'
import React from 'react'

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
    brandWhite: Palette['primary']
    brandBlack: Palette['primary']
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
    brandWhite: PaletteOptions['primary']
    brandBlack: PaletteOptions['primary']
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
  interface TypographyVariants {
    logoL: React.CSSProperties
    logoS: React.CSSProperties
    body3: React.CSSProperties
    body4: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    logoL?: React.CSSProperties
    logoS?: React.CSSProperties
    body3?: React.CSSProperties
    body4?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    logoL: true
    logoS: true
    body3: true
    body4: true
  }
}

const fallbackFonts = ['Helvetica Neue', 'Arial', 'sans-serif']
const normalFontFamily = ['Noto Sans TC', ...fallbackFonts].join(',')
const logoFontFamily = ['Montserrat', ...fallbackFonts].join(',')

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
    dark5: { main: '#212121' },
    dark6: { main: '#292929' },
    light1: { main: '#EBEBEB' },
    light2: { main: '#CCCCCC' },
    light3: { main: '#A0A0A0' },
    light4: { main: '#7B7B7B' },
    brandWhite: { main: '#DBE0EC' },
    brandBlack: { main: '#131924' }
  },
  typography: {
    fontFamily: normalFontFamily,
    logoL: {
      fontFamily: logoFontFamily,
      fontWeight: 800,
      fontSize: 28,
      lineHeight: 1.25
    },
    logoS: {
      fontFamily: logoFontFamily,
      fontWeight: 700,
      fontSize: 24,
      lineHeight: 1.25
    },
    h1: {
      fontWeight: 500,
      fontSize: 32,
      lineHeight: 1.25
    },
    h2: {
      fontWeight: 500,
      fontSize: 28,
      lineHeight: 1.25
    },
    h3: {
      fontWeight: 500,
      fontSize: 24,
      lineHeight: 1.25
    },
    h4: {
      fontWeight: 500,
      fontSize: 20,
      lineHeight: 1.25
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: 18,
      lineHeight: 1.4
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: 18,
      lineHeight: 1.4
    },
    body1: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.5
    },
    body3: {
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 1.5
    },
    body4: {
      fontWeight: 400,
      fontSize: 11,
      lineHeight: 1.5
    }
  }
})

export default theme
