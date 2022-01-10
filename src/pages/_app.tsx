import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from 'components/Header';
import 'global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>BS</title>
    </Head>
    <Header />
    <Component {...pageProps} />
  </>
);

export default MyApp;
