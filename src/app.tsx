import React, { ReactNode } from 'react'
import Theme from './theme'
import CssBaseline from '@mui/material/CssBaseline'

export const App: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Theme>{children}</Theme>
    </React.Fragment>
  )
}

export default App
