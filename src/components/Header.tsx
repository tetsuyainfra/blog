// @ts-nocheck
import * as React from 'react'
import { Link } from 'gatsby-link'
import styled, { StyledComponent } from '@emotion/styled'
import { Theme, useTheme } from '@mui/material/styles'

// import { Toolbar, AppBar, Typography, Button } from '@mui/material'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import useSiteMetadata from './useSiteMetadata'
import { ColorModeContext } from './ColorMode'

const ButtonWrapper = styled.div`
  & > * {
    margin: ${(props) => props.theme.spacing(1)};
  }
`

const Header: React.FC<{}> = ({}) => {
  const { title } = useSiteMetadata()

  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  console.log('theme', theme, colorMode)
  // const classes = useStyles()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <img
                alt="Gatsby G Logo"
                src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
              />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {/* {theme.palette.mode} mode */}
          {/* <div style={{ margin: theme.spacing(1) }}> */}
          <ButtonWrapper>
            <Button variant="contained" color="secondary" disableElevation>
              Blog
            </Button>
            <Button variant="contained" color="secondary" disableElevation>
              Link
            </Button>
          </ButtonWrapper>
          {/* </div> */}
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          {/* <Button color="inherit">Login</Button>
          <Button color="secondary">secondary</Button>
          <Button color="success">success</Button>
          <Button color="error">error</Button> */}
          {/* <Checkbox defaultChecked /> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
