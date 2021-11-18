import Link from 'next/link';
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import { useThemeContext } from '../pages/_app';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'center',
      padding: theme.spacing(3, 5),
    },
    title: {
      ...theme.typography.h4,
      color: theme.palette.text.primary,
    },
    nav: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gap: theme.spacing(4),
      justifyContent: 'end',
      marginRight: theme.spacing(4),
      ...theme.typography.h6,
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
  })
);

interface StyledLinkProps {
  theme: 'dark' | 'light';
  href: string;
  text: string;
}

export const Header = () => {
  const { theme, toggle } = useThemeContext();
  const classes = useStyles({ themeColor: theme });
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.title}>BS</div>
        </a>
      </Link>
      <nav className={classes.nav}>
        <Link href="/games">
          <a className={classes.link}>Games</a>
        </Link>
        <Link href="/projects">
          <a className={classes.link}>Projects</a>
        </Link>
      </nav>
      <div>
        <IconButton onClick={toggle}>
          <SettingsBrightnessIcon fontSize="large" />
        </IconButton>
      </div>
    </header>
  );
};
