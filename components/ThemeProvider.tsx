import { useState, createContext } from 'react';
import {
  ThemeProvider,
  Theme,
  ThemeOptions,
  createMuiTheme,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

interface Themes {
  dark: ThemeOptions;
  light: ThemeOptions;
}

const themes: Themes = {
  dark: {
    palette: { type: 'dark' },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          a: {
            color: '#ffc600',
            textDecoration: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  },
  light: {
    palette: { type: 'light' },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          a: {
            color: '#4A78E6',
            textDecoration: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  },
};

interface ThemeContextProps {
  theme: 'dark' | 'light';
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  toggle: () => undefined,
});

export const MyThemeProvider = ({ children }: { children: JSX.Element[] }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggle = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const muiTheme: Theme = createMuiTheme(themes[theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
