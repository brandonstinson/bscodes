import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MyThemeProvider } from '../components/ThemeProvider';
import { Header } from '../components/Header';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>BS</title>
      </Head>
      <MyThemeProvider>
        <Header />
        <Component {...pageProps} />
      </MyThemeProvider>
    </>
  );
};
export default MyApp;
