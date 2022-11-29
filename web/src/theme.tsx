import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = {
  mono: `'Menlo', monospace`,
  manrope: `'Manrope', sans-serif`,
  roboto: `'Roboto', sans-serif`,
  inter: `'Inter', sans-serif`,
  nunito: `'Nunito', sans-serif`,
}

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
})

export default theme
