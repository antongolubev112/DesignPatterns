/*
  This code implements the Template pattern.
  The Template pattern is used to define the skeleton of an algorithm in a method, deferring some steps to subclasses.
  It lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
*/

abstract class Game {
    protected numberOfPlayers: number;
    protected currentPlayer: number;

    constructor(numberOfPlayers: number) {
        this.numberOfPlayers = numberOfPlayers;
        this.currentPlayer = 0;
    }

    run(): void {
        this.start();
        while (!this.haveWinner) {
            this.takeTurn();
        }
        console.log(`Player ${this.winningPlayer} wins.`);
    }

    abstract start(): void;
    abstract get haveWinner(): boolean;
    abstract takeTurn(): void;
    abstract get winningPlayer(): number;
}

class Chess extends Game {
    private maxTurns: number;
    private turn: number;

    constructor() {
        super(2);
        this.maxTurns = 10;
        this.turn = 1;
    }

    start(): void {
        console.log(
            `Starting a game of chess with ${this.numberOfPlayers} players.`
        );
    }

    get haveWinner(): boolean {
        return this.turn === this.maxTurns;
    }

    takeTurn(): void {
        console.log(
            `Turn ${this.turn++} taken by player ${this.currentPlayer}.`
        );
        this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayers;
    }

    get winningPlayer(): number {
        return this.currentPlayer;
    }
}

let chess = new Chess();
chess.run();