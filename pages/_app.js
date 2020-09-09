import '../styles/globals.css'
import Head from 'next/head'

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>建发磐龙府中秋博饼预约</title>
        <link rel="icon" href="../public/favicon.ico"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
