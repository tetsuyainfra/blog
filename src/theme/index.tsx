import React from 'react'
import { ReactNode } from 'react'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import { makeMuiCache } from './cache'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const muiCache = makeMuiCache()

export const Theme: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = createTheme()

  return (
    <CacheProvider
      value={muiCache} // <-- use the new cache here
    >
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  )
}

export default Theme
