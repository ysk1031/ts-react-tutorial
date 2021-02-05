export type SquareValue = 'X' | 'O' | null;

export interface HistoryUnit {
  squares: SquareValue[];
  latestLoc?: Location;
}

interface Location {
  col: number;
  row: number;
}
