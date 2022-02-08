import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from 'components/Header';
import { AnimatedFavicon } from 'components/AnimatedFavicon';
import 'global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>BS</title>
    </Head>
    <Header />
    <AnimatedFavicon />
    <Component {...pageProps} />
  </>
);

export default MyApp;
