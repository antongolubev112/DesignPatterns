/*
  This is an example of another way to implement the Chain of Responsibility pattern.
  This is a more complex example that uses an Event Broker to handle the chain of responsibility.
  An event broker is essentially a centralised component that handles all communication between components.
  The event broker exposes some shared object - query - that everyone can subscribe and unsubscribe to.
*/

type Handler = (sender: any, args: any) => void;

class Event {
  private handlers: Map<number, Handler>;
  private count: number;

  constructor() {
    // this is the chain of responsibility
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

enum WhatToQuery {
  'attack' = 1,
  'defense' = 2
}

class Query {
  creatureName: string;
  whatToQuery: WhatToQuery;
  value: number;

  constructor(creatureName: string, whatToQuery: WhatToQuery, value: number) {
    this.creatureName = creatureName;
    this.whatToQuery = whatToQuery;
    this.value = value;
  }
}

class Game {
  queries: Event;

  constructor() {
    // This event will be used for querying data from creatures
    this.queries = new Event();
  }

  performQuery(sender: any, query: Query): void {
    this.queries.fire(sender, query);
  }
}

class Creature {
  game: Game;
  name: string;
  initial_attack: number;
  initial_defense: number;

  constructor(game: Game, name: string, attack: number, defense: number) {
    this.game = game;
    this.name = name;
    this.initial_attack = attack;
    this.initial_defense = defense;
  }

  // Make a query. The reason we don't just return the value is that we don't know what modifiers might affect it in the future.
  get attack(): number {
    let q = new Query(this.name, WhatToQuery.attack, this.initial_attack);
    this.game.performQuery(this, q);
    return q.value;
  }

  get defense(): number {
    let q = new Query(this.name, WhatToQuery.defense, this.initial_defense);
    this.game.performQuery(this, q);
    return q.value;
  }

  toString(): string {
    return `${this.name}: (${this.attack}/${this.defense})`;
  }
}

// Base class for modifiers.
class CreatureModifier {
  game: Game;
  creature: Creature;
  token: number;

  constructor(game: Game, creature: Creature) {
    this.game = game;
    this.creature = creature;

    // store the token from when we subscribe to the game's events
    this.token = game.queries.subscribe(this.handle.bind(this));
  }

  handle(sender: any, query: Query): void {
    // implement in inheritors
  }

  dispose(): void {
    this.game.queries.unsubscribe(this.token);
  }
}

class DoubleAttackModifier extends CreatureModifier {
  constructor(game: Game, creature: Creature) {
    super(game, creature);
  }

  handle(sender: any, query: Query): void {
    if (query.creatureName === this.creature.name && query.whatToQuery === WhatToQuery.attack) {
      query.value *= 2;
    }
  }
}

class IncreaseDefenseModifier extends CreatureModifier {
  constructor(game: Game, creature: Creature) {
    super(game, creature);
  }

  handle(sender: any, query: Query): void {
    if (query.creatureName === this.creature.name && query.whatToQuery === WhatToQuery.defense) {
      // reusing the query object to modify what is returned
      query.value += 2;
    }
  }
}

// Event Broker
let game = new Game();

// Create a creature
let goblin = new Creature(game, 'Strong Goblin', 2, 2);
console.log(goblin.toString());

// Add modifiers to the creature
let dam = new DoubleAttackModifier(game, goblin);
console.log(goblin.toString());

let idm = new IncreaseDefenseModifier(game, goblin);
console.log(goblin.toString());
idm.dispose();

dam.dispose();
console.log(goblin.toString());