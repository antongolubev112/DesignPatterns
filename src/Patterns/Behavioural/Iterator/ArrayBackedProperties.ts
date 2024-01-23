/*
    This code demonstrates how to array backed properties can be used to refactor a brittle class.
    The idea is that instead of having a bunch of individual properties, we have an array of properties.

    While we do not explicitly implement an iterator in this code, we have implemented a way to iterate over the array of properties.
    This allows us to iterate over the properties in a more generic way.
*/
class Creature {
  private stats: number[];

  constructor() {
    // this.strength = this.agility
    //   = this.intelligence = 10;

    //Array backed properties.
    this.stats = new Array(3).fill(10);
  }

  get strength(): number {
    return this.stats[0];
  }

  set strength(value: number) {
    this.stats[0] = value;
  }

  get agility(): number {
    return this.stats[1];
  }

  set agility(value: number) {
    this.stats[1] = value;
  }

  get intelligence(): number {
    return this.stats[2];
  }

  set intelligence(value: number) {
    this.stats[2] = value;
  }

  /*
      The problem with this approach is that its brittle.
      If we add a new stat, we need to add that stat into all of the methods below.
    */

  // get sumOfStats()
  // {
  //   return this.strength + this.agility
  //     + this.intelligence;
  // }
  //
  // get averageStat()
  // {
  //   return sumOfStats() / 3.0; // magic number
  // }
  //
  // get maxStat()
  // {
  //   return Math.max(this.strength, this.agility,
  //     this.intelligence);
  // }

  /*
      Because we are using array backed properties, we can now use array methods to get the sum, average, and max of the stats.
      This is a much less brittle approach than the one above.
    */
  get sumOfStats(): number {
    return this.stats.reduce((x, y) => x + y, 0);
  }

  get averageStat(): number {
    return this.sumOfStats / this.stats.length;
  }

  get maxStat(): number {
    return Math.max(...this.stats);
  }
}

let creature = new Creature();
creature.strength = 10;
creature.agility = 11;
creature.intelligence = 15;
console.log(
  `Creature has average stat ${creature.averageStat}, ` +
    `max stat = ${creature.maxStat}, ` +
    `sum of stats = ${creature.sumOfStats}.`
);
