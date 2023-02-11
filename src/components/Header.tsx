import * as React from 'react'
import styled from '@emotion/styled'
import { Link, useStaticQuery, graphql } from 'gatsby'

import useSiteMetadata from './useSiteMetadata'
import { Toolbar, AppBar, Typography } from '@mui/material'

const Header: React.FC<{}> = ({}) => {
  const { title } = useSiteMetadata()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>{title}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
