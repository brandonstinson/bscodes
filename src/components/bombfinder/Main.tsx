import { useEffect, useState } from 'react';
import { CoveredSquare, UncoveredSquare } from 'components/bombfinder/Square';
import { NumberDisplay } from './NumberDisplay';
import {
  GameStatus,
  generateGrid,
  getGameStatus,
  Grid,
  Square,
  statusCount,
  updateGrid,
} from './bombfinderUtils';

const gameStatusMap = {
  ongoing: `🙂`,
  won: `😃`,
  lost: `🙁`,
};
const GRID_SIZE = 16;
const NUMBER_OF_BOMBS = 40;

export const Main: React.FC = () => {
  const newGame = (): void => {
    setGrid(generateGrid(GRID_SIZE, NUMBER_OF_BOMBS));
    setRemainingBombs(NUMBER_OF_BOMBS);
  };

  const handleLeftClick = (square: Square): void => {
    setGrid(updateGrid(grid, square, `left`));
  };

  const handleRightClick = (square: Square): void => {
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
    <div className="p-2 bg-[#c2c2c2] border-4 outset-border border-[#eceff4]">
      <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center justify-items-center p-2">
        <NumberDisplay value={remainingBombs} />
        <span className="text-xl text-gray-900">{`<- Bombs`}</span>
        <button
          onClick={newGame}
          className="w-12 h-12 outline-none cursor-pointer border-4 outset-border border-[#eceff4] active:inset-border">
          <span className="text-3xl" role="img" aria-label="smile">
            {gameStatusMap[gameStatus]}
          </span>
        </button>
        <span className="text-xl text-gray-900">{`Time ->`}</span>
        <NumberDisplay value={0} />
      </div>
      <div className="grid grid-cols-[repeat(16,_auto)] border-4 inset-border border=[#eceff4] mt-2">
        {grid.map((row) =>
          row.map((square) =>
            square.status === 'uncovered' ? (
              <UncoveredSquare
                key={`${square.row}-${square.col}`}
                type={square.type}
                adjacent={square.adjacent}
              />
            ) : (
              <CoveredSquare
                key={`${square.row}-${square.col}`}
                square={square}
                leftClickFn={handleLeftClick}
                rightClickFn={handleRightClick}
                gameStatus={gameStatus}
              />
            )
          )
        )}
      </div>
    </div>
  );
};
