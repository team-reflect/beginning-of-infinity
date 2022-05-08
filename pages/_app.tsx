import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>The Beginning of Infinity</title>

        <meta name="description" content="All failures are due to lack of knowledge." />
        <meta
          name="og:description"
          content="All failures are due to lack of knowledge."
        />
        <meta name="og:title" content="The Beginning of Infinity" />
        <meta name="og:url" content="https://thebeginningofinfinity.xyz" />
        <meta name="apple-mobile-web-app-title" content="The Beginning of Infinity" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://thebeginningofinfinity.xyz/twitter-card.png"
        />
        <meta name="og:title" content="Reflect" />
        <meta
          name="og:image"
          content="https://thebeginningofinfinity.xyz/twitter-card.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
