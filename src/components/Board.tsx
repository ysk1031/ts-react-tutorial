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
  const cols = [0, 1, 2];
  const rows = [0, 1, 2];
  return (
    <div>
      {rows.map((row) => {
        return (
          <div className="board-row" key={row}>
            {cols.map((col: number) => {
              const index = 3 * row + col;
              return (
                <Square
                  value={squares[index]}
                  highlighted={highlightedLine.includes(index)}
                  onClick={() => onClick(index)}
                  key={index}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
