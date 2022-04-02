import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtl from 'stylis-plugin-rtl'
import { useRouter } from 'next/router'
import { FC } from 'react'

// NB: A unique `key` is important for it to work!
const options = {
  rtl: { key: 'fa', stylisPlugins: [rtl] },
  ltr: { key: 'en' },
}

export const RtlProvider: FC = ({ children }: any) => {
  const { locale } = useRouter()
  const dir = locale == 'fa' ? 'rtl' : 'ltr'
  const cache = createCache(options[dir])
  return <CacheProvider value={cache}>
    {children}
  </CacheProvider>
}