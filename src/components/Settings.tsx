import { Component, useContext, Show } from "solid-js";
import type { JSX } from "solid-js";

import { GameContext } from "@/utils/GameContext";
import { Button } from "@/components/ui/button";

const Settings: Component = () => {
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
          <input type="radio" />
        </div>
      }
    >
      <Button size="lg">Hello world</Button>
    </Show>
  );
};

export default Settings;
