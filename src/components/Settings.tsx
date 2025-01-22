import { Component, useContext, Show } from "solid-js";
import type { JSX } from "solid-js";

import {
  showCoordinates,
  setShowCoordinates,
  showFullCoordinates,
  setShowFullCoordinates,
} from "@/utils/Store";

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

  const handleReset: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (
    e
  ) => {
    e.preventDefault();
    gameContext.resetGame();
  };

  return (
    <Show when={gameContext.isGameActive()} fallback={<RadioGroup />}>
      <div class="flex items-center justify-center">
        <Button
          size="lg"
          class="uppercase font-semibolt tracking-wider"
          onClick={handleReset}
        >
          reset
        </Button>
      </div>
    </Show>
  );
};

export default Settings;

const RadioGroup: Component = () => {
  return (
    <div class="flex flex-col gap-4">
      <Switch
        checked={showCoordinates()}
        onChange={() => setShowCoordinates(!showCoordinates())}
        id="coordinates"
        class="flex items-center space-x-2"
      >
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>Show coordinates</SwitchLabel>
      </Switch>
      <Switch
        checked={showFullCoordinates()}
        onChange={() => setShowFullCoordinates(!showFullCoordinates())}
        id="fullCoordinates"
        class="flex items-center space-x-2"
      >
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>Coordinates on every square</SwitchLabel>
      </Switch>
    </div>
  );
};
