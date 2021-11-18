import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ContentContainer } from '../../components/ContentContainer';
import { Instructions } from '../../components/bombfinder/Instructions';
import { Main } from '../../components/bombfinder/Main';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gap: theme.spacing(4),
    },
    title: {
      textAlign: 'center',
      ...theme.typography.h2,
    },
  })
);

const Bombfinder: React.FC = () => {
  const classes = useStyles();
  return (
    <ContentContainer>
      <div className={classes.container}>
        <div className={classes.title}>BombFinder</div>
        <Instructions />
        <Main />
      </div>
    </ContentContainer>
  );
};

export default Bombfinder;
