import { createSignal, createEffect, Index, onCleanup } from 'solid-js';

import { ChessSquareQueue } from "../utils/ChessSquareQueue"

import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';

const Board = () => {
    const [score, setScore] = createSignal(0);
    const [timeLeft, setTimeLeft] = createSignal(30);
    const [isGameActive, setIsGameActive] = createSignal(false);
    const [targetSquare, setTargetSquare] = createSignal("");
    const [nextSquare, setNextSquare] = createSignal("")

    let gameQueue: ChessSquareQueue;

    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

    const startGame = () => {
        gameQueue = new ChessSquareQueue();
        setScore(0);
        setTimeLeft(30);
        setIsGameActive(true);
        setTargetSquare(gameQueue.getCurrentSquare());
        setNextSquare(gameQueue.getNextSquare());
    }

    const handleSquareClick = (square: string) => {
        if (!isGameActive) return;

        if (square === targetSquare()) {
            setScore(prev => prev + 1);
            gameQueue.advanceQueue();
            setTargetSquare(gameQueue.getCurrentSquare());
            setNextSquare(gameQueue.getNextSquare());
        }
    }

    createEffect(() => {
        let timer: ReturnType<typeof setInterval> | undefined;
        if (isGameActive() && timeLeft() > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft() === 0) {
            setIsGameActive(false);
        }

        onCleanup(() => clearInterval(timer))
    }, [isGameActive, timeLeft]);

    return (
        <>
            <div class='flex items-center justify-center p-4'>
                <div class='grid grid-cols-8 gap-0 w-full aspect-square max-w-4xl'>
                    <Index each={ranks}>
                        {(rank, rankIndex) => (
                            <Index each={files}>
                                {(file, fileIndex) => {
                                    const isLight = (rankIndex + fileIndex) % 2 === 0;
                                    const square = `${file()}${rank()}`;
                                    return (
                                        <button
                                            onClick={() => handleSquareClick(square)}
                                            class={`
                                aspect-square flex text-xs relative
                                ${isLight ? 'bg-chess-light' : 'bg-chess-dark'}
                                cursor-pointer
                            `}
                                        >
                                            <span class={`
                                text-xs uppercase md:text-sm font-bold absolute top-1 right-1 opacity-50
                                ${isLight ? "text-chess-dark" : "text-chess-light"}
                            `}
                                            >
                                                {square}
                                            </span>
                                        </button>
                                    );
                                }}
                            </Index>
                        )}
                    </Index>
                </div>

            </div>
            {!isGameActive() &&
                <div class='flex items-center justify-center p-4'>
                    <Button size="lg" class='uppercase font-semibold tracking-wider' onClick={startGame}>start training</Button>
                </div>
            }
            {isGameActive() && 
                <div class='flex items-center justify-center text-white text-2xl'>
                    <h1>{targetSquare()}</h1>
                    <h3>{nextSquare()}</h3>
                </div>
            }
            <div class='p-4'>
                <Card class='w-full max-w-4xl mx-auto'>
                    <CardHeader>
                        <CardTitle>Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {score()}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Board