import { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Image from 'next/image';
import { NumberDisplay } from './NumberDisplay';
import flagIcon from '../../public/minesweeper-flag.png';
import mineIcon from '../../public/minesweeper-mine.svg';
import {
  GameStatus,
  generateGrid,
  getGameStatus,
  Grid,
  Square,
  statusCount,
  updateGrid,
} from '../../utils/minesweeper-utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: 'grid',
      justifyContent: 'center',
    },
    container: {
      padding: theme.spacing(1),
      background: '#c2c2c2',
    },
    borderOutset: {
      border: '4px outset #eceff4',
    },
    borderInset: {
      border: '4px inset #eceff4',
    },
    control: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      justifyItems: 'center',
      alignItems: 'center',
      padding: theme.spacing(1),
      '& button': {
        width: '50px',
        height: '50px',
        outline: 'none',
      },
      '& button:active': {
        border: '4px inset #eceff4',
      },
    },
    face: {
      fontSize: '30px',
    },
    minefield: {
      display: 'grid',
      gridTemplateColumns: 'repeat(16, auto)',
      marginTop: theme.spacing(1),
      alignContent: 'center',
      justifyContent: 'center',
      '& button': {
        width: '30px',
        height: '30px',
        outline: 'none',
        display: 'grid',
        justifyItems: 'center',
        alignItems: 'center',
      },
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

const gameStatusMap = {
  ongoing: `🙂`,
  won: `😃`,
  lost: `🙁`,
};

export const Main: React.FC = () => {
  const classes = useStyles();

  const GRID_SIZE = 16;
  const NUMBER_OF_MINES = 40;

  const displaySquare = (square: Square): JSX.Element => {
    const { status, type, adjacent, row, col } = square;
    if (status !== `uncovered`) {
      return (
        <button
          key={`${row}-${col}`}
          onClick={(e) => {
            e.preventDefault();
            handleClick(square);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            handleRightClick(square);
          }}
          disabled={gameStatus !== `ongoing`}
          style={{ backgroundColor: `#eceff4`, border: `4px outset #d8dee9` }}>
          {status === `flagged` ? (
            <Image src={flagIcon} alt="red flag" />
          ) : null}
        </button>
      );
    }
    return (
      <button
        key={`${row}-${col}`}
        style={{
          backgroundColor: `#d8dee9`,
          color: colorMap[adjacent],
          fontWeight: 900,
        }}
        disabled>
        {type === `mine` ? (
          <Image src={mineIcon} alt="mine" />
        ) : adjacent === 0 ? (
          ``
        ) : (
          adjacent
        )}
      </button>
    );
  };

  const newGame = (): void => {
    setGrid(generateGrid(GRID_SIZE, NUMBER_OF_MINES));
    setRemainingMines(NUMBER_OF_MINES);
  };

  const handleClick = (square: Square): void => {
    setGrid(updateGrid(grid, square, `left`));
  };

  const handleRightClick = (square: Square): void => {
    setGrid(updateGrid(grid, square, `right`));
  };

  const [grid, setGrid] = useState<Grid>(
    generateGrid(GRID_SIZE, NUMBER_OF_MINES)
  );
  const [remainingMines, setRemainingMines] = useState<number>(NUMBER_OF_MINES);
  const [gameStatus, setGameStatus] = useState<GameStatus>(`ongoing`);

  useEffect(() => {
    const sc = statusCount(grid);
    setRemainingMines(NUMBER_OF_MINES - sc.flagged.empty - sc.flagged.mine);
    setGameStatus(getGameStatus(grid, GRID_SIZE, NUMBER_OF_MINES));
  }, [grid]);

  useEffect(() => {
    if (gameStatus === `lost`) {
      setRemainingMines(0);
    }
  }, [gameStatus]);

  return (
    <div className={classes.main}>
      <div className={`${classes.container} ${classes.borderOutset}`}>
        <div className={`${classes.control} ${classes.borderInset}`}>
          <NumberDisplay value={remainingMines} />
          <button className={classes.borderOutset} onClick={newGame}>
            <span role="img" aria-label="smile" className={classes.face}>
              {gameStatusMap[gameStatus]}
            </span>
          </button>
          <NumberDisplay value={0} />
        </div>
        <div className={`${classes.minefield} ${classes.borderInset}`}>
          {grid.map((row) => row.map((square) => displaySquare(square)))}
        </div>
      </div>
    </div>
  );
};
