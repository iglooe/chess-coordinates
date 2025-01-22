import { Component, useContext, For, Show } from "solid-js";

import { showCoordinates, showFullCoordinates } from "@/utils/Store";

import { files, ranks } from "@/utils/Store";
import { GameContext } from "@/utils/GameContext";

import Coordinates from "./Coordinates";
import ChessSquare from "./ChessSquare";

const ChessBoard: Component = () => {
  const gameContext = useContext(GameContext);

  return (
    <div class="w-full h-full">
      <div class="resize-x overflow-auto no-scrollbar min-w-[200px] max-w-4xl w-full h-fit border-2 border-gray-300 rounded">
        <div class="w-full aspect-square">
          <div class="relative w-full h-full">
            <Coordinates />

            {/* Chess board squares */}
            <div class="grid grid-cols-8 w-full h-full">
              <For each={ranks}>
                {(rank, rankIndex) => (
                  <For each={files}>
                    {(file, fileIndex) => (
                      <ChessSquare
                        file={file}
                        rank={rank}
                        isLight={(rankIndex() + fileIndex()) % 2 === 0}
                        onClick={() =>
                          gameContext?.handleSquareClick(`${file}${rank}`)
                        }
                      />
                    )}
                  </For>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
