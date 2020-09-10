import '../styles/globals.css'
import Head from 'next/head'

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>建发磐龙府中秋博饼预约</title>
        <link rel="icon" href="../public/favicon.ico"/>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
