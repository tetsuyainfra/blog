import React, { ReactNode } from 'react'
import { CacheProvider } from '@emotion/react'
import { GatsbyBrowser } from 'gatsby'

import { myCache } from './create-emotion-cache'
import App from './src/app'

// console.debug('THIS IS gatsby-browser')

// export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
//   element,
// }) => {
//   // console.debug('wrapRootElement')
//   // return <App>{element}</App>
//   return (
//     <CacheProvider value={myCache}>
//       <App>{element}</App>
//     </CacheProvider>
//   )
// }
