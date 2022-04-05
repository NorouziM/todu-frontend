// next
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';

// hooka
import useLocales from '@hooks/useLocales';
// Chakra
import { Chakra } from 'components/Chakra';
// utils
import { RtlProvider } from '@utils/rtl-provider';
import fetcher from '@utils/fetcher';
// context
import { AuthProvider } from '@contexts/JWTContext';

function MyApp({ Component, pageProps }: AppProps) {
  const { trans } = useLocales();

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="title" content="با تودیو تسک هات رو مدیریت کن!" />
        <meta
          name="description"
          content="وب سایت تودیو ابزاری ساده و کارآمد برای مدیریت تسک‌های شماست. یک وب سایت کاملا ایرانی با قابلیت های ویژه"
        />
        <meta
          name="description"
          content="وب سایت تودیو ابزاری ساده و کارآمد برای مدیریت تسک‌های شماست. یک وب سایت کاملا ایرانی با قابلیت های ویژه"
        />
        <meta
          name="keywords"
          content="todu,ابزار تودو لیست, ابزار مدیریت کارها ایرانی, سایت تودیو, مدیریت تسک ها"
        />
        <meta name="author" content="Mohammad Norouzi" />
      </Head>
      <SWRConfig
        value={{
          fetcher: (resource) => fetcher(resource),
          onError: (err) => {
            console.error(err, 'SWR error');
          },
        }}
      >
        <AuthProvider>
          <Chakra cookies={pageProps.cookies}>
            <RtlProvider>
              <Component {...pageProps} />
            </RtlProvider>
          </Chakra>
        </AuthProvider>
      </SWRConfig>
    </>
  );
}

export { getServerSideProps } from 'components/Chakra';

export default MyApp;
