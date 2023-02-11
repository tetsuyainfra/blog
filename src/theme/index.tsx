import React from 'react'
import { ReactNode } from 'react'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { makeMuiCache } from './cache'

const muiCache = makeMuiCache()

export const Theme: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  console.debug('isDarkMode', isDarkMode)

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#d87274',
        light: '#ffa2a3',
        dark: '#a34449',
      },
    },
  })

  return (
    <CacheProvider
      value={muiCache} // <-- use the new cache here
    >
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default Theme
