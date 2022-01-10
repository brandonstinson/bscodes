// Helper functions
const randomIntInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Types
interface BombLocations {
  [key: number]: number[];
}

export type SquareType = `empty` | `bomb`;
export type SqureAdjacent = number;
export type SquareStatus = `covered` | `uncovered` | `flagged`;

export interface Square {
  row: number;
  col: number;
  type: SquareType;
  adjacent: SqureAdjacent;
  status: SquareStatus;
}

export type Grid = Square[][];

export type GameStatus = `ongoing` | `won` | `lost`;

interface StatusCount {
  uncovered: {
    empty: number;
    bomb: number;
  };
  flagged: {
    empty: number;
    bomb: number;
  };
}

// BombFinder utils
const generateBombs = (gridSize: number, numberOfBombs: number): BombLocations => {
  const bombs: Set<number> = new Set();
  while (bombs.size < numberOfBombs) {
    bombs.add(randomIntInRange(1, gridSize * gridSize));
  }
  const bombLocations: BombLocations = {};
  bombs.forEach((value) => {
    const key = Math.ceil(value / gridSize) - 1;
    const val = (value - 1) % gridSize;
    if (Object.keys(bombLocations).includes(String(key))) {
      bombLocations[key].push(val);
    } else {
      const newArr = [val];
      bombLocations[key] = newArr;
    }
  });
  return bombLocations;
};

export const generateGrid = (gridSize: number, numberOfBombs: number): Grid => {
  const bombs = generateBombs(gridSize, numberOfBombs);
  const outerArray: Grid = [];
  for (let i = 0; i < gridSize; i++) {
    const innerArr: Square[] = [];
    for (let j = 0; j < gridSize; j++) {
      if (bombs[i] && bombs[i].includes(j)) {
        innerArr.push({ row: i, col: j, type: `bomb`, adjacent: 0, status: `covered` });
      } else {
        innerArr.push({ row: i, col: j, type: `empty`, adjacent: 0, status: `covered` });
      }
    }
    outerArray.push(innerArr);
  }
  populateAdjacents(outerArray);
  return outerArray;
};

const getAdjacentSquares = (grid: Grid, i: number, j: number): Square[] => {
  const adjacent: Square[] = [];
  // previous row
  if (grid[i - 1]) {
    if (grid[i - 1][j - 1]) adjacent.push(grid[i - 1][j - 1]);
    adjacent.push(grid[i - 1][j]);
    if (grid[i - 1][j + 1]) adjacent.push(grid[i - 1][j + 1]);
  }
  // current row
  if (grid[i][j - 1]) adjacent.push(grid[i][j - 1]);
  if (grid[i][j + 1]) adjacent.push(grid[i][j + 1]);
  // next row
  if (grid[i + 1]) {
    if (grid[i + 1][j - 1]) adjacent.push(grid[i + 1][j - 1]);
    adjacent.push(grid[i + 1][j]);
    if (grid[i + 1][j + 1]) adjacent.push(grid[i + 1][j + 1]);
  }
  return adjacent;
};

const populateAdjacents = (grid: Grid): void => {
  grid.forEach((row, i) => {
    row.forEach((square, j) => {
      if (square.type === `empty`) {
        const adjacentSquares = getAdjacentSquares(grid, i, j);
        const bombSquares = adjacentSquares.filter((adjSq) => adjSq.type === `bomb`);
        square.adjacent = bombSquares.length;
      }
    });
  });
};

const revealAllBombs = (grid: Grid): Grid => {
  const newGrid = [...grid];
  newGrid.forEach((row) => {
    row.forEach((square) => {
      if (square.type === `bomb`) {
        square.status = `uncovered`;
      }
    });
  });
  return newGrid;
};

export const statusCount = (grid: Grid): StatusCount => {
  let uncoveredEmpty = 0;
  let uncoveredBomb = 0;
  let flaggedEmpty = 0;
  let flaggedBomb = 0;
  grid.forEach((row) => {
    row.forEach((square) => {
      if (square.status === `uncovered` && square.type === `empty`) {
        uncoveredEmpty++;
      }
      if (square.status === `uncovered` && square.type === `bomb`) {
        uncoveredBomb++;
      }
      if (square.status === `flagged` && square.type === `empty`) {
        flaggedEmpty++;
      }
      if (square.status === `flagged` && square.type === `bomb`) {
        flaggedBomb++;
      }
    });
  });
  return {
    uncovered: {
      empty: uncoveredEmpty,
      bomb: uncoveredBomb,
    },
    flagged: {
      empty: flaggedEmpty,
      bomb: flaggedBomb,
    },
  };
};

export const getGameStatus = (grid: Grid, gridSize: number, numberOfBombs: number): GameStatus => {
  const squareCount = gridSize * gridSize;
  const uncoveredCount = squareCount - numberOfBombs;
  const sc = statusCount(grid);
  if (sc.uncovered.bomb > 0) {
    return `lost`;
  }
  if (sc.uncovered.empty === uncoveredCount && sc.flagged.bomb === numberOfBombs) {
    return `won`;
  }
  return `ongoing`;
};

export const updateGrid = (grid: Grid, square: Square, clickType: string): Grid => {
  const newGrid = [...grid];
  if (clickType === `right`) {
    square.status = square.status === `covered` ? `flagged` : `covered`;
  } else {
    if (square.type === `bomb`) {
      return revealAllBombs(newGrid);
    }
    newGrid[square.row][square.col].status = `uncovered`;
    if (square.adjacent === 0) {
      uncoverAdjacents(newGrid, square);
    }
  }
  return newGrid;
};

const uncoverAdjacents = (grid: Grid, square: Square): void => {
  const adjacents = getAdjacentSquares(grid, square.row, square.col);
  const adjacentZeros = adjacents.filter(
    (el) => el.status === `covered` && el.type === `empty` && el.adjacent === 0
  );
  const adjacentEmpties = adjacents.filter((el) => el.status === `covered` && el.type === `empty`);
  adjacentEmpties.forEach((sq) => (grid[sq.row][sq.col].status = `uncovered`));
  if (adjacentZeros.length < 1) return;
  adjacentZeros.forEach((sq) => {
    sq.status = `uncovered`;
    uncoverAdjacents(grid, sq);
  });
};
