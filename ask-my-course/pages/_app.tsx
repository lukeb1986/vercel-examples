import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'

import Layout from '../components/Layout'
import EmptyLayout from '../components/EmptyLayout'

import '@vercel/examples-ui/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(<Component {...pageProps} />)
}

export default App
