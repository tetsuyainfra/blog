import createCache from '@emotion/cache'

export const createMyCache = () =>
  createCache({
    key: 'my-prefix-key',
    stylisPlugins: [
      /* your plugins here */
    ],
  })

export const myCache = createMyCache()
