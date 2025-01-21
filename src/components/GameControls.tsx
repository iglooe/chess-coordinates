import { Component, useContext, Show } from "solid-js";
import type { JSX } from "solid-js";

import { GameContext } from "@/utils/GameContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const GameControls: Component = () => {
  const gameContext = useContext(GameContext)!;

  const handleStart: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (
    e
  ) => {
    e.preventDefault();
    gameContext.startGame();
  };

  return (
    <Show
      when={gameContext.isGameActive()}
      fallback={
        <div class="flex items-center justify-center p-4">
          <Button
            size="lg"
            class="uppercase font-semibold tracking-wider"
            onClick={handleStart}
          >
            start training
          </Button>
        </div>
      }
    >
      <ScoreCard />
      <TimerCard />
      <NextSquare />
    </Show>
  );
};

export default GameControls;

const ScoreCard: Component = () => {
  const gameContext = useContext(GameContext)!;

  return (
    <Show when={gameContext.isGameActive()}>
      <div class="p-4">
        <Card class="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Score</CardTitle>
          </CardHeader>
          <CardContent>{gameContext.score()}</CardContent>
        </Card>
      </div>
    </Show>
  );
};

const TimerCard: Component = () => {
  const gameContext = useContext(GameContext)!;

  return (
    <Show when={gameContext.isGameActive()}>
      <div class="p-4">
        <Card class="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Time</CardTitle>
          </CardHeader>
          <CardContent>{gameContext.timeLeft()}</CardContent>
        </Card>
      </div>
    </Show>
  );
};

const NextSquare: Component = () => {
  const gameContext = useContext(GameContext);
  return (
    <div class="flex items-center justify-center text-white text-2xl">
      <h1>{gameContext?.targetSquare()}</h1>
      <h3>{gameContext?.nextSquare()}</h3>
    </div>
  );
};
