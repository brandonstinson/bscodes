import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { NumberDisplay } from './NumberDisplay';
import {
  GameStatus,
  generateGrid,
  getGameStatus,
  Grid,
  SquareType,
  statusCount,
  updateGrid,
} from '../../utils/bombfinderUtils';

const Square = dynamic(() => import('../bombfinder/Square'), { ssr: false });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: 'grid',
      justifyContent: 'center',
    },
    container: {
      padding: theme.spacing(1),
      background: '#c2c2c2',
      border: '4px outset #eceff4',
    },
    control: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto 1fr auto',
      justifyItems: 'center',
      alignItems: 'center',
      padding: theme.spacing(1),
      border: '4px inset #eceff4',
      '&> span': {
        ...theme.typography.body1,
        fontWeight: 700,
        color: '#1e1e1e',
      },
      '& button': {
        width: '50px',
        height: '50px',
        outline: 'none',
        cursor: 'pointer',
        border: '4px outset #eceff4',
      },
      '& button:active': {
        border: '4px inset #eceff4',
      },
    },
    face: {
      fontSize: '30px',
    },
    bombfield: {
      display: 'grid',
      gridTemplateColumns: 'repeat(16, auto)',
      marginTop: theme.spacing(1),
      alignContent: 'center',
      justifyContent: 'center',
      border: '4px inset #eceff4',
    },
  })
);

const gameStatusMap = {
  ongoing: `🙂`,
  won: `😃`,
  lost: `🙁`,
};

export const Main: React.FC = () => {
  const classes = useStyles();

  const GRID_SIZE = 16;
  const NUMBER_OF_BOMBS = 40;

  const newGame = (): void => {
    setGrid(generateGrid(GRID_SIZE, NUMBER_OF_BOMBS));
    setRemainingBombs(NUMBER_OF_BOMBS);
  };

  const handleLeftClick = (square: SquareType): void => {
    setGrid(updateGrid(grid, square, `left`));
  };

  const handleRightClick = (square: SquareType): void => {
    setGrid(updateGrid(grid, square, `right`));
  };

  const [grid, setGrid] = useState<Grid>(
    generateGrid(GRID_SIZE, NUMBER_OF_BOMBS)
  );
  const [remainingBombs, setRemainingBombs] = useState<number>(NUMBER_OF_BOMBS);
  const [gameStatus, setGameStatus] = useState<GameStatus>(`ongoing`);

  useEffect(() => {
    const sc = statusCount(grid);
    setRemainingBombs(NUMBER_OF_BOMBS - sc.flagged.empty - sc.flagged.bomb);
    setGameStatus(getGameStatus(grid, GRID_SIZE, NUMBER_OF_BOMBS));
  }, [grid]);

  useEffect(() => {
    if (gameStatus === `lost`) {
      setRemainingBombs(0);
    }
  }, [gameStatus]);

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.control}>
          <NumberDisplay value={remainingBombs} />
          <span>{`<- Bombs`}</span>
          <button onClick={newGame}>
            <span role="img" aria-label="smile" className={classes.face}>
              {gameStatusMap[gameStatus]}
            </span>
          </button>
          <span>{`Time ->`}</span>
          <NumberDisplay value={0} />
        </div>
        <div className={classes.bombfield}>
          {grid.map((row) =>
            row.map((square) => (
              <Square
                key={`${square.row}-${square.col}`}
                square={square}
                leftClickFn={handleLeftClick}
                rightClickFn={handleRightClick}
                gameStatus={gameStatus}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
