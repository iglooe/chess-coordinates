import { Component, For, Show } from "solid-js";

import { showCoordinates, showFullCoordinates } from "@/utils/Store";
import { files, ranks } from "@/utils/Store";

const Coordinates: Component = () => {
  return (
    <Show when={showFullCoordinates() == false ? showCoordinates() : null}>
      <div class="absolute top-1 z-10 right-1 h-full flex flex-col justify-around text-sm">
        <For each={ranks}>
          {(rank) => (
            <div class="flex font-medium h-[12.5%] text-black opacity-50">
              {rank}
            </div>
          )}
        </For>
      </div>

      <div class="absolute bottom-1 left-1 z-10 w-full flex justify-around text-sm">
        <For each={files}>
          {(file) => (
            <div class="w-[12.5%] font-medium text-black opacity-50">
              {file}
            </div>
          )}
        </For>
      </div>
    </Show>
  );
};

export default Coordinates;
