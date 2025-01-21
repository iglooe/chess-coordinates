import { Component, useContext, Show } from "solid-js";

import { GameContext } from "@/utils/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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

export default TimerCard;
