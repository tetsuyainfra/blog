import React, { ReactNode } from 'react'
import { GatsbyBrowser } from 'gatsby'

import App from './src/app'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return <App>{element}</App>
}
