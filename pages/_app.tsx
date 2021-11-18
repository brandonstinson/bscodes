import { useState, useEffect, createContext, useContext } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Header } from '../components/Header';
import { themes } from '../utils/theme';

interface ThemeContextProps {
  theme: 'dark' | 'light';
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  toggle: () => undefined,
});

export const useThemeContext = () => useContext(ThemeContext);

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggle = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const muiTheme: Theme = createMuiTheme(themes[theme]);

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
      <ThemeContext.Provider value={{ theme, toggle }}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};
export default MyApp;
