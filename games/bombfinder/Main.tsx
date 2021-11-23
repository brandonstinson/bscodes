import { useEffect, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { NumberDisplay } from './NumberDisplay';
import {
  GameStatus,
  generateGrid,
  getGameStatus,
  Grid,
  SquareType,
  statusCount,
  updateGrid,
} from './bombfinderUtils';

const Square = dynamic(() => import('./Square'), { ssr: false });

const StyledMain = styled.div`
  display: grid;
  justify-content: center;
`;

const StyledContainer = styled.div`
  padding: 10px;
  border: 4px outset #eceff4;
  background-color: #c2c2c2;
`;

const StyledControl = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;
  justify-items: center;
  align-items: center;
  padding: 10px;
  > span {
    font-weight: normal;
    font-size: 20px;
    color: #1e1e1e;
  }
  button {
    width: 50px;
    height: 50px;
    outline: none;
    cursor: pointer;
    border: 4px outset #eceff4;
  }
  button:active {
    border: 4px inset #eceff4;
  }
`;

const StyledFace = styled.span`
  font-size: 30px;
`;

const StyledBombfield = styled.div`
  display: grid;
  grid-template-columns: repeat(16, auto);
  margin-top: 10px;
  align-content: center;
  justify-content: center;
  border: 4px inset #eceff4;
`;

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
    <StyledMain>
      <StyledContainer>
        <StyledControl>
          <NumberDisplay value={remainingBombs} />
          <span>{`<- Bombs`}</span>
          <button onClick={newGame}>
            <StyledFace role="img" aria-label="smile">
              {gameStatusMap[gameStatus]}
            </StyledFace>
          </button>
          <span>{`Time ->`}</span>
          <NumberDisplay value={0} />
        </StyledControl>
        <StyledBombfield>
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
        </StyledBombfield>
      </StyledContainer>
    </StyledMain>
  );
};
