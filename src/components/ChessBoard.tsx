import { Component, useContext, For } from 'solid-js';

import { GameContext } from '@/utils/GameContext';
import ChessSquare from './ChessSquare';

const ChessBoard: Component = () => {
    const gameContext = useContext(GameContext);
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

    return (
        <div class='flex items-center justify-center p-4'>
            <div class='grid grid-cols-8 gap-0 w-full aspect-square max-w-4xl'>
                <For each={ranks}>
                    {(rank, rankIndex) => (
                        <For each={files}>
                            {(file, fileIndex) => (
                                <ChessSquare
                                    file={file}
                                    rank={rank}
                                    isLight={(rankIndex() + fileIndex()) % 2 === 0}
                                    onClick={() => gameContext?.handleSquareClick(`${file}${rank}`)}
                                />
                            )}
                        </For>
                    )}
                </For>
            </div>
        </div>
    );
};

export default ChessBoard;