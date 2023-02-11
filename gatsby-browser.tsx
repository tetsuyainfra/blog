import React, { ReactNode } from 'react'
import { GatsbyBrowser } from 'gatsby'

import App from './src/app'

console.log('THIS IS gatsby-browser')

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  console.debug('wrapRootElement')
  return <App>{element}</App>
}
