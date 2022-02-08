import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from 'components/Header';
import 'global.css';

import favB from '../../public/favicons/faviconB.ico';
import favS from '../../public/favicons/faviconS.ico';
import favU from '../../public/favicons/faviconU.ico';

const favicons = [favB, favS, favU];

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <Head>
        <title>BS</title>
        <link rel="icon" href={favicons[count % favicons.length].src} />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
