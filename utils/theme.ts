import { ThemeOptions } from '@material-ui/core/styles';

interface Themes {
  dark: ThemeOptions;
  light: ThemeOptions;
}

export const themes: Themes = {
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
