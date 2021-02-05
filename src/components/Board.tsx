import React from 'react';
import { Square } from './Square';
import { SquareValue } from 'interface';

interface BoardProps {
  squares: SquareValue[];
  highlightedLine: number[];
  onClick: (i: number) => void;
}

export const Board: React.FC<BoardProps> = ({
  squares,
  highlightedLine,
  onClick,
}) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        value={squares[i]}
        highlighted={highlightedLine.includes(i)}
        onClick={() => onClick(i)}
        key={i}
      />
    );
  };

  const cols = [0, 1, 2];
  const rows = [0, 1, 2];
  return (
    <div>
      {rows.map((row) => {
        return (
          <div className="board-row" key={row}>
            {cols.map((col) => renderSquare(3 * row + col))}
          </div>
        );
      })}
    </div>
  );
};
