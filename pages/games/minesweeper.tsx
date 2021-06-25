import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Instructions } from '../../components/minesweeper/Instructions';
import { Main } from '../../components/minesweeper/Main';
import { Footer } from '../../components/minesweeper/Footer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gap: theme.spacing(5),
      justifyContent: 'center',
      padding: theme.spacing(5),
    },
    left: {
      display: 'grid',
      alignContent: 'center',
      gap: theme.spacing(5),
    },
    title: {
      textAlign: 'center',
      ...theme.typography.h2,
    },
  })
);

const Minesweeper: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.title}>Minesweeper</div>
        <Instructions />
        <Footer />
      </div>
      <Main />
    </div>
  );
};

export default Minesweeper;
