import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    numbers: {
      display: 'grid',
      justifyItems: 'center',
      alignContent: 'center',
      width: '80px',
      color: '#ff0701',
      background: '#333',
      textAlign: 'center',
      fontSize: '40px',
      borderRadius: theme.shape.borderRadius,
      cursor: 'default',
    },
  })
);

export const NumberDisplay = ({ value }: { value: number }) => {
  const classes = useStyles();
  const nonNegVal = value < 0 ? 0 : value;
  return (
    <div className={classes.numbers}>
      <span>{nonNegVal.toString().padStart(3, `0`)}</span>
    </div>
  );
};
