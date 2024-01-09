import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Object Hierarchy is defined below

// Base class
class HotDrink {
  consume() {}
}

// Derived class
class Tea extends HotDrink {
  consume() {
    console.log('This tea is nice with lemon!');
  }
}

// Derived class
class Coffee extends HotDrink {
  consume() {
    console.log(`This coffee is delicious!`);
  }
}

// Base class for Abstract Factory
// Guide to the inheritors of this class as to what kinds of methods they need to be implementing and providing
abstract class HotDrinkFactory {
  abstract prepare(amount: number): HotDrink;
}

// Derived Factory
class CoffeeFactory extends HotDrinkFactory {
  prepare(amount: number): HotDrink {
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Tea();
  }
}

// Derived Factory
class TeaFactory extends HotDrinkFactory {
  prepare(amount: number): HotDrink {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

// Use of enum allows the abstract factory class to know what factories exist
const AvailableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory
});

// Abstract Factory class
class HotDrinkMachine {
  private factories: Record<string, HotDrinkFactory> = {};

  constructor() {
    for (let drink in AvailableDrink) {
      // initialize each available factory
      this.factories[drink] = new (AvailableDrink as Record<string, new () => HotDrinkFactory>)[drink]();
    }
  }

  // Bad approach
  // If we make a new factory we will need to modify this method
  makeDrink(type: string): HotDrink {
    switch (type) {
      case 'tea':
        return new TeaFactory().prepare(200);
      case 'coffee':
        return new CoffeeFactory().prepare(50);
      default:
        throw new Error(`Don't know how to make ${type}`);
    }
  }

  // Better approach
  // Allows us to dynamically create each drink type and amounts
  interact(consumer: (drink: HotDrink) => void): void {
    rl.question('Please specify drink and amount ' +
      '(e.g., tea 50): ', answer => {
      const parts = answer.split(' ');
      const name = parts[0];
      const amount = parseInt(parts[1]);
      const d = this.factories[name].prepare(amount);
      rl.close();
      consumer(d);
    });
  }
}

const machine = new HotDrinkMachine();

// Bad Approach
// rl.question('which drink? ', function(answer)
// {
//   let drink = machine.makeDrink(answer);
//   drink.consume();
//
//   rl.close();
// });

// Better approach
machine.interact(
  function (drink) {
    drink.consume();
  }
);
