import { createSignal, createEffect, Index, onCleanup } from 'solid-js';

import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';

const Board = () => {
    const [score, setScore] = createSignal(0);
    const [timeLeft, setTimeLeft] = createSignal(30);
    const [isGameActive, setIsGameActive] = createSignal(false);
    const [targetSquare, setTargetSquare] = createSignal("");

    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

    function generateTarget() {
        const file = files[Math.floor(Math.random() * 8)];
        const rank = ranks[Math.floor(Math.random() * 8)];
        return `${file}${rank}`
    }

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setIsGameActive(true);
        setTargetSquare(generateTarget());
    }

    const handleSquareClick = (square: string) => {
        if (!isGameActive) return;

        // only generate a new square once the target has been clicked, otherwise do nothing
        if (square === targetSquare()) {
            setScore(prev => prev + 1);
            setTargetSquare(generateTarget())
        } else {
            return;
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
            <div class='grid grid-cols-8 gap-0 border w-full aspect-square max-w-4xl'>
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
            <Card class='w-full max-w-4xl mx-auto'>
                <CardHeader>
                    <CardTitle class='text-center'>Chess Coordinates</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class='text-center mb-4'>
                        <div class='text-xl mb-2'>
                            {isGameActive() ? (
                                <>
                                    <span>Find: {targetSquare()}</span>
                                    <span>Score: {score()}</span>
                                    <span>Time: {timeLeft()}</span>
                                </>
                            ) : (
                                <Button size="lg" onClick={startGame}>Start game</Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default Board