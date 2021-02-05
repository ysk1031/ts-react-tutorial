import { SquareValue } from './interface';

interface SquareProps {
  value: SquareValue;
  highlighted: boolean;
  onClick: () => void;
}

export function Square(props: SquareProps) {
  return (
    <button
      className={`square ${props.highlighted ? 'highlighted' : ''}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
