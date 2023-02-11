import React from 'react'
import { GatsbySSR } from 'gatsby'

import { CacheProvider } from '@emotion/react'
import { createMyCache } from './create-emotion-cache'

/*
// import { renderToString } from 'react-dom/server'
// import createEmotionServer from '@emotion/server/create-instance'

// import { makeMuiCache } from './src/theme/cache'
export const replaceRenderer: GatsbySSR['replaceRenderer'] = (
  args,
  options
) => {
  const { bodyComponent, replaceBodyHTMLString, setHeadComponents } = args

  //
  // MUI(emotion)のキャッシュ
  //
  const muiCache = makeMuiCache()
  const { extractCriticalToChunks } = createEmotionServer(muiCache)

  const emotionStyles = extractCriticalToChunks(
    renderToString(
      <CacheProvider value={muiCache}>{bodyComponent}</CacheProvider>
    )
  )

  const muiStyleTags = emotionStyles.styles.map((style) => {
    const { css, key, ids } = style || {}
    return (
      <style
        key={key}
        data-emotion={`${key} ${ids.join(` `)}`}
        dangerouslySetInnerHTML={{ __html: css }}
      />
    )
  })

  const combinedStyleTags = [
    // typographyPreconnect,
    // ...typographyFontTags,
    ...muiStyleTags,
  ]
  setHeadComponents(combinedStyleTags)

  // render the result from `extractCritical`
  replaceBodyHTMLString(emotionStyles.html)
}
*/

// export const wrapRootElement: GatsbySSR['wrapPageElement'] = ({ element }) => (
//   <CacheProvider value={createMyCache()}>{element}</CacheProvider>
// )
