/*
    This is an example of a method chain, which is a type of chain of responsibility.

*/
class Creature {
  name: string;
  attack: number;
  defense: number;

  constructor(name: string, attack: number, defense: number) {
    this.name = name;
    this.attack = attack;
    this.defense = defense;
  }

  toString(): string {
    return `${this.name} (${this.attack}/${this.defense})`;
  }
}

/*
      Base class for modifiers. This is the chain of responsibility.
  */
class CreatureModifier {
  creature: Creature;
  next: CreatureModifier | null;

  constructor(creature: Creature) {
    this.creature = creature;

    // The next modifier in the chain.
    // Essentially a linked list.
    this.next = null;
  }

  // if there is a next modifier, add it to the chain.
  // if there is not, set the next modifier to the modifier passed in.
  add(modifier: CreatureModifier): void {
    if (this.next) this.next.add(modifier);
    else this.next = modifier;
  }

  handle(): void {
    if (this.next) this.next.handle();
  }
}

class NoBonusesModifier extends CreatureModifier {
  constructor(creature: Creature) {
    super(creature);
  }

  // this modifier will break the chain of responsibility.
  // this is because we don't call super.handle().
  handle(): void {
    console.log("No bonuses for you!");
  }
}

class DoubleAttackModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    console.log(`Doubling ${this.creature.name}'s attack`);
    this.creature.attack *= 2;

    // this allows us to traverse the chain of responsibility.
    // it will call the next modifier in the chain.
    super.handle();
  }
}

class IncreaseDefenseModifier extends CreatureModifier {
  constructor(creature) {
    super(creature);
  }

  handle() {
    if (this.creature.attack <= 2) {
      console.log(`Increasing ${this.creature.name}'s defense`);
      this.creature.defense++;
    }
    super.handle();
  }
}

let goblin = new Creature("Goblin", 1, 1);
console.log(goblin.toString());

/*
    This is the root of the chain of responsibility.
    It is the first modifier in the chain.

    We can add as many modifiers as we want to the chain.
*/
let root = new CreatureModifier(goblin);

//root.add(new NoBonusesModifier(goblin));

root.add(new DoubleAttackModifier(goblin));
//root.add(new DoubleAttackModifier(goblin));

root.add(new IncreaseDefenseModifier(goblin));

// eventually we call handle on the root, which will call handle on the next modifier in the chain and so on.
root.handle();
console.log(goblin.toString());
