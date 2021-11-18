import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      display: 'grid',
      justifyContent: 'center',
      padding: theme.spacing(0, 5, 8),
    },
  })
);

type Props = {
  children: React.ReactNode;
};

export const ContentContainer = ({ children }: Props) => {
  const classes = useStyles();

  return <div className={classes.contentContainer}>{children}</div>;
};
