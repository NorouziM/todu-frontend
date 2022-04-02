// next
import type { AppProps } from 'next/app'
import Head from 'next/head'
// Chakra
import { Chakra } from 'components/Chakra'
// utils
import { RtlProvider } from '@utils/rtl-provider'
// styles
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {

  return (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta
            name="description"
            content="وب سایت تودیو ابزاری ساده و کارآمد برای مدیریت تسک‌های شماست. یک وب سایت کاملا ایرانی با قابلیت های ویژه"
          />
          <meta name="keywords" content="todu,ابزار تودو لیست, ابزار مدیریت کارها ایرانی, سایت تودیو, مدیریت تسک ها" />
          <meta name="author" content="Mohammad Norouzi" />
    </Head>
    <Chakra cookies={pageProps.cookies}>
      <RtlProvider>
        <Component {...pageProps} />
      </RtlProvider>
    </Chakra>
  </>)

}

export { getServerSideProps } from "components/Chakra";

export default MyApp
