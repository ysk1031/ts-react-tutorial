import React from 'react';
import { Square } from './Square';
import { SquareValue } from './interface';

interface BoardProps {
  squares: SquareValue[];
  highlightedLine: number[];
  onClick: (i: number) => void;
}

export class Board extends React.Component<BoardProps, {}> {
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
