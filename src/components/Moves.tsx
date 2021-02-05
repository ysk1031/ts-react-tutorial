import { HistoryUnit } from 'interface';
import React from 'react';

interface MovesProps {
  history: HistoryUnit[];
  historyOrderAsc: boolean;
  currentStepIndex: number;
  jumpTo: (move: number) => void;
}

export const Moves: React.FC<MovesProps> = ({
  history,
  historyOrderAsc,
  currentStepIndex,
  jumpTo,
}) => {
  return (
    <ol>
      {history.map((step, move) => {
        const moveIndex = historyOrderAsc ? move : history.length - 1 - move;
        const desc = moveIndex
          ? `Go to move # ${moveIndex} (Latest / col: ${step.latestLoc?.col}, row: ${step.latestLoc?.row})`
          : 'Go to game start';
        return (
          <li key={moveIndex}>
            <button
              onClick={() => jumpTo(moveIndex)}
              className={currentStepIndex === move ? 'text-bold' : ''}
            >
              {desc}
            </button>
          </li>
        );
      })}
    </ol>
  );
};
