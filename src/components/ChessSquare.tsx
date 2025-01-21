import { Component, Show } from "solid-js";

import { showCoordinates } from "@/utils/Store";

interface ChessSquareProps {
  file: string;
  rank: string;
  isLight: boolean;
  onClick: () => void;
}

const ChessSquare: Component<ChessSquareProps> = (props) => {
  const square = `${props.file}${props.rank}`;

  return (
    <button
      onClick={props.onClick}
      class={`
        aspect-square flex text-xs relative
        ${props.isLight ? "bg-chess-light" : "bg-chess-dark"}
        cursor-pointer
      `}
    >
      <Show when={showCoordinates()}>
        <span
          class={`
            text-xs uppercase font-bold absolute top-1 right-1 opacity-50
            ${props.isLight ? "text-chess-dark" : "text-chess-light"}
          `}
        >
          {square}
        </span>
      </Show>
    </button>
  );
};

export default ChessSquare;
