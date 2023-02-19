import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {
    // console.log("in ColorModeContext")
  },
})

export const ColorMode: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['DARK_MODE'])
  const init_mode = cookies.DARK_MODE === 'true' ? 'dark' : 'light'

  const [mode, setMode] = React.useState<'light' | 'dark'>(init_mode)
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        console.log('in useMemo')
        setMode((prevMode) => {
          const mode = prevMode === 'light' ? 'dark' : 'light'
          console.log('in setMode')
          setCookie('DARK_MODE', mode === 'dark')
          return mode
        })
      },
    }),
    [],
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <CookiesProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ColorModeContext.Provider>
    </CookiesProvider>
  )
}

export default ColorMode
