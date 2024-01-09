const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const async = require('async');

// Object Hierarchy is defined below

// Base class
class HotDrink
{
  consume() {}
}

// Derived class
class Tea extends HotDrink
{
  consume() {
    console.log('This tea is nice with lemon!');
  }
}

// Derived class
class Coffee extends HotDrink
{
  consume()
  {
    console.log(`This coffee is delicious!`);
  }
}


// Base class for Abstract Factory
// Guide to the inheritors of this class as to what kinds of methods they need to be implementing and providing
class HotDrinkFactory
{
  prepare(amount) { /* abstract */ }
}

// Derived Factory
class CoffeeFactory extends HotDrinkFactory
{
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Tea();
  }
}

// Derived Factory
class TeaFactory extends HotDrinkFactory
{
  prepare(amount) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

// Use of enum allows the abstract factory class to know what factories exist
let AvailableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory
});

// Abstract Factory class
class HotDrinkMachine
{

  constructor()
  {
    this.factories = {};
    for (let drink in AvailableDrink)
    {
      //initialise each available factory
      this.factories[drink] = new AvailableDrink[drink]();
    }
  }

  // Bad approach
  // If we make a new factory we will need to modify this method
  makeDrink(type)
  {
    switch (type)
    {
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
  interact(consumer)
  {
    rl.question('Please specify drink and amount ' +
      '(e.g., tea 50): ', answer => {
      let parts = answer.split(' ');
      let name = parts[0];
      let amount = parseInt(parts[1]);
      let d = this.factories[name].prepare(amount);
      rl.close();
      consumer(d);
    });
  }
}

let machine = new HotDrinkMachine();

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