import * as React from 'react'
import { ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Header from './Header'
import { ColorMode } from './ColorMode'

type Props = { children: ReactNode | ReactNode[] }

const Layout: React.FC<Props> = ({ children }) => {
  // console.log("theme", theme);
  // console.log("darkTheme", darkTheme);

  // const colorMode = React.useContext(ColorModeContext);
  // console.log("colorMode", colorMode);

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <ColorMode>
        <CssBaseline />
        <Header />
        <main>{children}</main>
      </ColorMode>
    </>
  )
}

export default Layout
