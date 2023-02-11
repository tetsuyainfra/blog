import React, { ReactNode } from 'react'
import Theme from './theme'

export const App: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Theme>{children}</Theme>
}

export default App
