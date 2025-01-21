import { Component, useContext, Show } from "solid-js";
import type { JSX } from "solid-js";

import { showCoordinates, setShowCoordinates } from "@/utils/Store";

import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "~/components/ui/switch";
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
    <Show when={gameContext.isGameActive()} fallback={<RadioGroup />}>
      <Button size="lg">Hello world</Button>
    </Show>
  );
};

export default Settings;

const RadioGroup: Component = () => {
  return (
    <Switch
      checked={showCoordinates()}
      onChange={() => setShowCoordinates(!showCoordinates())}
      id="toggle-switch"
      class="flex items-center space-x-2"
    >
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>Coordinates on every square</SwitchLabel>
    </Switch>
  );
};
