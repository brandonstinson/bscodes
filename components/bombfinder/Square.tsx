import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { GameStatus, SquareType } from '../../utils/bombfinderUtils';

const useStyles = makeStyles<Theme, SquareProps>((theme: Theme) =>
  createStyles({
    square: {
      backgroundColor: ({ square }) =>
        square.status === `uncovered` ? `#d8dee9` : '#c2c2c2',
      color: ({ square }) => colorMap[square.adjacent],
      fontWeight: 900,
      width: '30px',
      height: '30px',
      border: ({ square }) =>
        square.status !== `uncovered`
          ? '4px outset #eceff4'
          : '4px inset #eceff4',
      display: 'grid',
      justifyItems: 'center',
      alignItems: 'center',
      textAlign: 'center',
      cursor: ({ gameStatus }) =>
        gameStatus === 'ongoing' ? 'pointer' : 'default',
    },
  })
);

enum colorMap {
  /*eslint-disable */
  'blue' = 1,
  'green',
  'red',
  'purple',
  'maroon',
  'turquoise',
  'black',
  'gray',
  /*eslint-enable */
}

type SquareProps = {
  square: SquareType;
  leftClickFn: (square: SquareType) => void;
  rightClickFn: (square: SquareType) => void;
  gameStatus: GameStatus;
};

const Square = (props: SquareProps): JSX.Element => {
  const classes = useStyles(props);

  const { square, leftClickFn, rightClickFn, gameStatus } = props;
  const { status, type, adjacent } = square;

  const getText = () => {
    if (status === `flagged`) return '🚩';
    if (status === `uncovered` && type === `bomb`) return '💣';
    if (status === 'uncovered' && adjacent !== 0) return adjacent;
    return ``;
  };

  return (
    <div
      className={classes.square}
      onClick={(e) => {
        e.preventDefault();
        if (gameStatus === 'ongoing' && status === `covered`) {
          leftClickFn(square);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (gameStatus === 'ongoing' && status !== `uncovered`) {
          rightClickFn(square);
        }
      }}>
      {getText()}
    </div>
  );
};

export default Square;
