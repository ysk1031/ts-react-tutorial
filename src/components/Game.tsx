import React, { useState } from 'react';
import { Board } from './Board';
import { Moves } from './Moves';
import { SquareValue, HistoryUnit } from 'interface';

export const Game: React.FC = () => {
  const [history, setHistory] = useState<HistoryUnit[]>([
    { squares: Array(9).fill(null) },
  ]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXISNext] = useState<boolean>(true);
  const [historyOrderAsc, setHistoryOrderAsc] = useState<boolean>(true);

  const handleClick = (i: number) => {
    const _history = history.slice(0, stepNumber + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      _history.concat([
        {
          squares: squares,
          latestLoc: {
            col: i % 3,
            row: Math.trunc(i / 3),
          },
        },
      ]),
    );
    setStepNumber(_history.length);
    setXISNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXISNext(step % 2 === 0);
  };

  const toggleHistoryOrder = () => {
    setHistoryOrderAsc(!historyOrderAsc);
  };

  const orderedHistory = historyOrderAsc ? history : history.slice().reverse();
  const currentStepIndex = historyOrderAsc
    ? stepNumber
    : orderedHistory.length - 1 - stepNumber;
  const current: HistoryUnit = orderedHistory[currentStepIndex];
  const winnerData = calculateWinner(current.squares);

  let status;
  if (winnerData.winner) {
    status = 'Winner: ' + winnerData.winner;
  } else if (stepNumber >= current.squares.length) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          highlightedLine={winnerData.line}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <Moves
          history={orderedHistory}
          historyOrderAsc={historyOrderAsc}
          currentStepIndex={currentStepIndex}
          jumpTo={jumpTo}
        />
        <button onClick={() => toggleHistoryOrder()}>
          Toggle History Order
        </button>
      </div>
    </div>
  );
};

interface WinnerDataset {
  winner?: SquareValue;
  line: number[];
}

function calculateWinner(squares: SquareValue[]): WinnerDataset {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }
  return {
    winner: null,
    line: [],
  };
}
