import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructions: {
      display: 'grid',
      justifyContent: 'center',
      textAlign: 'center',
      ...theme.typography.h6,
    },
    mouse: {},
    emoji: {
      display: 'flex',
      gap: theme.spacing(3),
    },
  })
);

export const Instructions = () => {
  const classes = useStyles();
  return (
    <div className={classes.instructions}>
      <div className={classes.mouse}>
        Left click to uncover. Right click to flag.
      </div>
      <div className={classes.emoji}>
        <span role="img" aria-label="ongoing-emoji">
          🙂{` `}Keep Playing
        </span>
        <span role="img" aria-label="won-emoji">
          😃{` `}You Won
        </span>
        <span role="img" aria-label="lost-emoji">
          🙁{` `}You Lost
        </span>
      </div>
    </div>
  );
};
