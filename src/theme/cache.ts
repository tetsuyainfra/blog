// ./src/theme/cache.js

import createCache, { Options, EmotionCache } from '@emotion/cache'

export const cacheProps: Options = {
  key: 'mui',
  prepend: true,
}

export let muiCache: EmotionCache | undefined

export const makeMuiCache = () => {
  if (!muiCache) {
    muiCache = createCache(cacheProps)
  }

  return muiCache
}
