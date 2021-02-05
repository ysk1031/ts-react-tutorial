import { SquareValue } from 'interface';
import React from 'react';

interface SquareProps {
  value: SquareValue;
  highlighted: boolean;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({
  value,
  highlighted,
  onClick,
}) => {
  return (
    <button
      className={`square ${highlighted ? 'highlighted' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
