import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type SquareValue = 'X' | 'O' | null;

interface SquareProps {
  value: SquareValue;
  highlighted: boolean;
  onClick: () => void;
}

function Square(props: SquareProps) {
  return (
    <button
      className={`square ${props.highlighted ? 'highlighted' : ''}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

interface BoardProps {
  squares: SquareValue[];
  highlightedLine: number[];
  onClick: (i: number) => void;
}

class Board extends React.Component<BoardProps, {}> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        highlighted={this.props.highlightedLine.includes(i)}
        onClick={() => this.props.onClick(i)}
        key={i}
      />
    );
  }

  render() {
    const cols = [0, 1, 2];
    const rows = [0, 1, 2];
    return (
      <div>
        {rows.map((row) => {
          return (
            <div className="board-row" key={row}>
              {cols.map((col) => this.renderSquare(3 * row + col))}
            </div>
          );
        })}
      </div>
    );
  }
}

interface Location {
  col: number;
  row: number;
}

interface History {
  squares: SquareValue[];
  latestLoc?: Location;
}

interface GameState {
  history: History[];
  stepNumber: number;
  xIsNext: boolean;
  historyOrderAsc: boolean;
}

class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      historyOrderAsc: true,
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
          latestLoc: {
            col: i % 3,
            row: Math.trunc(i / 3),
          },
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  toggleHistoryOrder() {
    this.setState({
      historyOrderAsc: !this.state.historyOrderAsc,
    });
  }

  render() {
    const history = this.state.historyOrderAsc
      ? this.state.history
      : this.state.history.slice().reverse();
    const currentStepIndex = this.state.historyOrderAsc
      ? this.state.stepNumber
      : history.length - 1 - this.state.stepNumber;
    const current = history[currentStepIndex];
    const winnerData = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const moveIndex = this.state.historyOrderAsc
        ? move
        : history.length - 1 - move;
      const desc = moveIndex
        ? `Go to move # ${moveIndex} (Latest / col: ${step.latestLoc?.col}, row: ${step.latestLoc?.row})`
        : 'Go to game start';
      return (
        <li key={moveIndex}>
          <button
            onClick={() => this.jumpTo(moveIndex)}
            className={currentStepIndex === move ? 'text-bold' : ''}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winnerData.winner) {
      status = 'Winner: ' + winnerData.winner;
    } else if (this.state.stepNumber >= current.squares.length) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            highlightedLine={winnerData.line}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button onClick={() => this.toggleHistoryOrder()}>
            Toggle History Order
          </button>
        </div>
      </div>
    );
  }
}

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

ReactDOM.render(<Game />, document.getElementById('root'));
