type Handler = (sender: any, args: any) => void;

class Event {
  private handlers: Map<number, Handler>;
  private count: number;

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

class Game {
  ratEnters: Event;
  ratDies: Event;
  notifyRat: Event;

  constructor() {
    this.ratEnters = new Event();
    this.ratDies = new Event();
    this.notifyRat = new Event();
  }

  fireRatEnters(sender: any): void {
    this.ratEnters.fire(sender, null);
  }

  fireRatDies(sender: any): void {
    this.ratDies.fire(sender, null);
  }

  fireNotifyRat(sender: any, whichRat: any): void {
    this.notifyRat.fire(sender, whichRat);
  }
}

class Rat {
  private game: Game;
  attack: number;

  constructor(game: Game) {
    this.game = game;
    this.attack = 1;

    // subscribe this rat to the games events
    // pass a relevant callback function to each event
    // use bind(this) to pass the rat object as the sender
    game.ratEnters.subscribe(this.handleRatEnters.bind(this));
    game.ratDies.subscribe(this.handleRatDies.bind(this));
    game.notifyRat.subscribe(this.handleNotifyRat.bind(this));
    game.fireRatEnters(this);
  }

  handleRatEnters(sender: any, args: any): void {
    if (sender !== this) {
      this.attack++;
      this.game.fireNotifyRat(this, sender);
    }
  }

  handleRatDies(sender: any, args: any): void {
    this.attack--;
  }

  handleNotifyRat(sender: any, whichRat: any): void {
    if (whichRat === this) this.attack++;
  }

  die(): void {
    this.game.fireRatDies(this);
  }
}

describe('observer', function () {
  it('single rat test', function () {
    let game = new Game();
    let rat = new Rat(game);
    expect(rat.attack).toEqual(1);
  });

  it('two rat test', function () {
    let game = new Game();
    let rat = new Rat(game);
    let rat2 = new Rat(game);
    expect(rat.attack).toEqual(2);
    expect(rat2.attack).toEqual(2);
  });

  it('three rats one dies', function () {
    let game = new Game();

    let rat = new Rat(game);
    expect(rat.attack).toEqual(1);

    let rat2 = new Rat(game);
    expect(rat.attack).toEqual(2);
    expect(rat2.attack).toEqual(2);

    let rat3 = new Rat(game);
    expect(rat.attack).toEqual(3);
    expect(rat2.attack).toEqual(3);
    expect(rat3.attack).toEqual(3);
    rat3.die()

    expect(rat.attack).toEqual(2);
    expect(rat2.attack).toEqual(2);
  });
});