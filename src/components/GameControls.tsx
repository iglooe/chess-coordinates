import { Component, useContext, Show } from 'solid-js';
import type { JSX } from 'solid-js';

import { GameContext } from '@/utils/GameContext';
import { Button } from '@/components/ui/button';

const GameControls: Component = () => {
    const gameContext = useContext(GameContext)!;

    const handleStart: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (e) => {
        e.preventDefault();
        gameContext.startGame();
    };

    return (
        <Show
            when={!gameContext.isGameActive()}
            fallback={
                <div class='flex items-center justify-center text-white text-2xl'>
                    <h1>{gameContext.targetSquare()}</h1>
                    <h3>{gameContext.nextSquare()}</h3>
                </div>
            }
        >
            <div class='flex items-center justify-center p-4'>
                <Button
                    size="lg"
                    class='uppercase font-semibold tracking-wider'
                    onClick={handleStart}
                >
                    start training
                </Button>
            </div>
        </Show>
    );
};

export default GameControls;