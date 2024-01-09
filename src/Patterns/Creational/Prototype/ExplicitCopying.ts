/*
 The following code creates deep copies using explicit copying.
 Problem with this approach is that if you have object which use other objects which use other objects
 Then you will need to implement deepCopy for each composite object
*/

class Address {
  constructor(
    public streetAddress: string,
    public city: string,
    public country: string
  ) {}

  deepCopy(): Address {
    return new Address(
      this.streetAddress,
      this.city,
      this.country
    );
  }

  toString(): string {
    return `Address: ${this.streetAddress}, ` +
      `${this.city}, ${this.country}`;
  }
}

class Human {
  constructor(public name: string, public address: Address) {}

  deepCopy(): Human {
    return new Human(
      this.name,
      this.address.deepCopy() // needs to be recursive
    );
  }

  toString(): string {
    return `${this.name} lives at ${this.address}`;
  }
}

// John can serve as a prototype for people living in the same building
let john = new Human('John',
  new Address('123 London Road', 'London', 'UK'));

let jane = john.deepCopy();

jane.name = 'Jane';
jane.address.streetAddress = '321 Angel St'; // oops

console.log(john.toString()); // oops, john is called 'jane'
console.log(jane.toString());
