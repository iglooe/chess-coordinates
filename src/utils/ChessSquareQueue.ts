export class ChessSquareQueue {
    private files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
    private ranks: string[] = ["8", "7", "6", "5", "4", "3", "2", "1"];
    private queue: string[] = [];
    private minQueueSize: number = 3;

    constructor() {
        this.fillQueue();
    }

    private generateSquare(): string {
        const file = this.files[Math.floor(Math.random() * 8)];
        const rank = this.ranks[Math.floor(Math.random() * 8)];
        return `${file}${rank}`;
    }

    private fillQueue(): void {
        while (this.queue.length < this.minQueueSize) {
            this.queue.push(this.generateSquare());
        }
    }

    public getCurrentSquare(): string {
        return this.queue[0];
    }

    public getNextSquare(): string {
        return this.queue[1];
    }

    public advanceQueue(): void {
        this.queue.shift();
        this.fillQueue();
    }
}