import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      textAlign: 'center',
    },
  })
);

export const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <div className={classes.footer}>
        Mine icon from{` `}
        <a
          href="https://www.flaticon.com/authors/creaticca-creative-agency"
          title="Creaticca Creative Agency">
          Creaticca Creative Agency
        </a>
        {` `}/{` `}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </footer>
  );
};
