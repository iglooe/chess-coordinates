import { createSignal } from "solid-js";

const [showCoordinates, setShowCoordinates] = createSignal(true);
const [showFullCoordinates, setShowFullCoordinates] = createSignal(true);

export {
  showCoordinates,
  setShowCoordinates,
  showFullCoordinates,
  setShowFullCoordinates,
};

export const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
