import 'src/styles/globals.css'
import PageWithLayoutType from 'src/types/pageWithLayout'
import React from 'react'

type AppLayoutProps = {
  Component: PageWithLayoutType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

if (process.env.NODE_ENV === 'test') {
  require('../../mocks')
}

function MyApp({ Component, pageProps }: AppLayoutProps): JSX.Element {
  const Layout = Component.layout ? Component.layout : React.Fragment

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
