type Handler = (sender: any, args: any) => void;

/*
  This file demonstrates the mediator pattern using events.
  The use of events is not a requirement for the mediator pattern,
  however it allows us to decouple the mediator from the objects that use it.
*/

class Event {
  handlers: Map<number, Handler>;
  count: number;

  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler: Handler): number {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx: number): void {
    this.handlers.delete(idx);
  }

  fire(sender: any, args: any): void {
    this.handlers.forEach((v, k) => {
      v(sender, args);
    });
  }
}

class PlayerScoredEventArgs {
  playerName: string;
  goalsScoredSoFar: number;

  constructor(playerName: string, goalsScoredSoFar: number) {
    this.playerName = playerName;
    this.goalsScoredSoFar = goalsScoredSoFar;
  }

  print(): void {
    console.log(`${this.playerName} has scored their ${this.goalsScoredSoFar} goal`);
  }
}

class Game {
  events: Event;

  constructor() {
    this.events = new Event();
  }
}

class Player {
  name: string;
  game: Game;
  goalsScored: number;

  constructor(name: string, game: Game) {
    this.name = name;
    this.game = game;
    this.goalsScored = 0;
  }

  score(): void {
    this.goalsScored++;
    let args = new PlayerScoredEventArgs(this.name, this.goalsScored);
    this.game.events.fire(this, args);
  }
}

class Coach {
  game: Game;

  constructor(game: Game) {
    this.game = game;

    game.events.subscribe((sender, args) => {
      if (args instanceof PlayerScoredEventArgs && args.goalsScoredSoFar < 3) {
        console.log(`coach says: well done, ${args.playerName}`);
      }
    });
  }
}

let game = new Game();
let player = new Player('Sam', game);
let coach = new Coach(game);

player.score();
player.score();
player.score();