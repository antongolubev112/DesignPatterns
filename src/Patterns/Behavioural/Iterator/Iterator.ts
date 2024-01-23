/*
  This code demonstrates the use of the iterator pattern in TypeScript.
  Below we have a hypothetical class - Stuff.
  We have made this class iterable by adding a Symbol.iterator property.
  This property must return a done and value property.
*/
class Stuff {
  a: number;
  b: number;

  constructor() {
    this.a = 11;
    this.b = 22;
  }

  // default iterator
  [Symbol.iterator](): Iterator<number> {
    let i = 0;
    let self = this;
    return {
      next: function () {
        return {
          done: i > 1,
          value: self[i++ === 0 ? "a" : "b"],
        };
      },
    };
  }

  // To make this function work, we need to make the iterator iterable.
  // We do this by defining the Symbol.iterator property and returning it.
  get backwards(): IterableIterator<number> {
    let i = 0;
    let self = this;
    return {
      next: function () {
        return {
          done: i > 1,
          value: self[i++ === 0 ? "b" : "a"],
        };
      },
      // make iterator iterable
      // It returns "this" meaning the function itself is the iterator.
      [Symbol.iterator]: function () {
        return this;
      },
    };
  }
}

// How does TypeScript know that an array is iterable?
// It looks for the Symbol.iterator property.
let values: number[] = [100, 200, 300];

// default ways of iterating an array.
for (let i in values) {
  console.log(`Element at pos ${i} is ${values[i]}`);
}

for (let v of values) {
  console.log(`Value is ${v}`);
}

let stuff = new Stuff();
for (let item of stuff) console.log(`${item}`);

for (let item of stuff.backwards) console.log(`${item}`);
