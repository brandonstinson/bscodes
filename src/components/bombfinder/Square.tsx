import {
  GameStatus,
  Square,
  SquareType,
  SqureAdjacent,
} from './bombfinderUtils';

const colors = [
  '',
  'text-[#0000FF]',
  'text-[#008000]',
  'text-[#FF0000]',
  'text-[#800080]',
  'text-[#800000]',
  'text-[#40E0D0]',
  'text-[#000000]',
  'text-[#808080]',
];

type CoveredProps = {
  square: Square;
  leftClickFn: (square: Square) => void;
  rightClickFn: (square: Square) => void;
  gameStatus: GameStatus;
};

export const CoveredSquare = ({
  square,
  leftClickFn,
  rightClickFn,
  gameStatus,
}: CoveredProps) => (
  <div
    className="w-7 h-7 grid content-center bg-[#c2c2c2] border-4 outset-border border-[#eceff4] text-center cursor-default"
    onClick={(e) => {
      e.preventDefault();
      if (gameStatus === 'ongoing') {
        leftClickFn(square);
      }
    }}
    onContextMenu={(e) => {
      e.preventDefault();
      if (gameStatus === 'ongoing') {
        rightClickFn(square);
      }
    }}>
    {square.status === 'flagged' ? '🚩' : ''}
  </div>
);

type UncoveredProps = {
  type: SquareType;
  adjacent: SqureAdjacent;
};

export const UncoveredSquare = ({ type, adjacent }: UncoveredProps) => (
  <div
    className={`w-7 h-7 grid content-center ${colors[adjacent]} font-black text-center bg-[#d8dee9] border-4 inset-border border-[#eceff4] cursor-default`}>
    {type === 'bomb' ? '💣' : adjacent > 0 ? adjacent : ''}
  </div>
);
