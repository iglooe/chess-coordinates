import { createSignal, createEffect, Component, onCleanup } from "solid-js";

import { GameContext } from "@/utils/GameContext";
import { ChessSquareQueue } from "../utils/ChessSquareQueue";
import Settings from "./Settings";
import ChessBoard from "./ChessBoard";
import GameControls from "./GameControls";

const Game = () => {
  const [score, setScore] = createSignal(0);
  const [timeLeft, setTimeLeft] = createSignal(30);
  const [isGameActive, setIsGameActive] = createSignal(false);
  const [targetSquare, setTargetSquare] = createSignal("");
  const [nextSquare, setNextSquare] = createSignal("");
  const [gameQueue, setGameQueue] = createSignal<ChessSquareQueue | null>(null);

  const startGame = () => {
    const newQueue = new ChessSquareQueue();
    setGameQueue(newQueue);
    setScore(0);
    setTimeLeft(30);
    setIsGameActive(true);
    setTargetSquare(newQueue.getCurrentSquare());
    setNextSquare(newQueue.getNextSquare());
  };

  const handleSquareClick = (square: string) => {
    const currentQueue = gameQueue();
    if (!isGameActive() || !currentQueue) return;

    if (square === targetSquare()) {
      setScore((prev) => prev + 1);
      currentQueue.advanceQueue();
      setTargetSquare(currentQueue.getCurrentSquare());
      setNextSquare(currentQueue.getNextSquare());
    }
  };

  createEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isGameActive() && timeLeft() > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft() === 0) {
      setIsGameActive(false);
    }

    onCleanup(() => clearInterval(timer));
  }, [isGameActive, timeLeft]);

  const gameContextValue = {
    score,
    timeLeft,
    isGameActive,
    targetSquare,
    nextSquare,
    handleSquareClick,
    startGame,
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="grid auto-rows-min lg:mx-24 lg:grid-rows-3 lg:grid-flow-col gap-4">
          <div class="row-span-3 col-span-6">
            <ChessBoard />
          </div>
          <div class="col-span-1">
            <GameControls />
          </div>
          <div class="row-span-2 col-span-1">
            <Settings />
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default Game;
