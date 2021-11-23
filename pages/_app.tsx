import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '../components/Header';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #2B303A;
    color: #FFFBFA;
  }
  a {
    text-decoration: none;
    color: #ECA400;
  }
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 35px;
  }
  h3 {
    font-size: 30px;
  }
  h4 {
    font-size: 25px;
  }
  h5 {
    font-size: 20px;
  }
  h6 {
    font-size: 15px;
  }
`;

const theme = {
  color: {
    primary: '#20A4F3',
    secondary: '#CA7DF9',
  },
};

const MyApp = ({ Component, pageProps }: AppProps) => (
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

export default MyApp;
