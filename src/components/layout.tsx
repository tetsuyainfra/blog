import * as React from 'react'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/react'

import { Link, useStaticQuery, graphql } from 'gatsby'

import gStyles, {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
} from './layout.module.css'
import useSiteMetadata from './useSiteMetadata'
import { Toolbar, AppBar, Typography } from '@mui/material'

const Wrapper = styled('div')`
  // border: 2px solid green;
  // padding: 10px;
`

const Layout: React.FC<{ pageTitle: string; children: React.ReactNode }> = ({
  pageTitle,
  children,
}) => {
  return (
    <Wrapper>
      {/* <Global
        styles={css`
          div {
            background: red;
            color: white;
          }
        `}
      /> */}
      <AppBar position="static">
        <Toolbar>
          <Typography>TEST</Typography>
        </Toolbar>
      </AppBar>
      <div className={container}>
        <header className={siteTitle}>{useSiteMetadata().title}</header>
        <nav>
          <ul className={navLinks}>
            <li className={navLinkItem}>
              <Link to="/" className={navLinkText}>
                Home
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/about" className={navLinkText}>
                About
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/blog" className={navLinkText}>
                Blog
              </Link>
            </li>
          </ul>
        </nav>
        <main>
          <h1 className={heading}>{pageTitle}</h1>
          {children}
        </main>
      </div>
    </Wrapper>
  )
}

export default Layout
