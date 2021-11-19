import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '../components/Header';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #2B303A;
    color: #FFFBFA;
  }
  a {
    text-decoration: none;
    color: #ECA400;
  }
`;

const theme = {
  color: {
    primary: '#20A4F3',
    secondary: '#CA7DF9',
  },
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>BS</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
