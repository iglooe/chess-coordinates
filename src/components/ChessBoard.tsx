import { Component, useContext, For } from "solid-js";

import { GameContext } from "@/utils/GameContext";
import ChessSquare from "./ChessSquare";

const ChessBoard: Component = () => {
  const gameContext = useContext(GameContext);
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

  return (
    <div class="w-full h-full p-4">
      <div
        class="resize-x overflow-auto no-scrollbar min-w-[200px] max-w-4xl w-full h-fit 
                border-2 border-gray-300 rounded"
      >
        <div class="w-full aspect-square">
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
  );
};

export default ChessBoard;
