import { createContext, Accessor } from "solid-js";

export interface GameContextType {
  score: Accessor<number>;
  timeLeft: Accessor<number>;
  isGameActive: Accessor<boolean>;
  targetSquare: Accessor<string>;
  nextSquare: Accessor<string>;
  handleSquareClick: (square: string) => void;
  startGame: () => void;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextType | null>(null);
