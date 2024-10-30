import { Component, useContext } from 'solid-js';
import { GameContext } from '@/utils/GameContext';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const ScoreCard: Component = () => {
    const gameContext = useContext(GameContext)!;

    return (
        <div class='p-4'>
            <Card class='w-full max-w-4xl mx-auto'>
                <CardHeader>
                    <CardTitle>Score</CardTitle>
                </CardHeader>
                <CardContent>
                    {gameContext.score()}
                </CardContent>
            </Card>
        </div>
    );
};

export default ScoreCard
