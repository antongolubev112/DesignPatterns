/*
  Builder Pattern is used for piece wise object creation.
  Use when your objects are complicated to create.
  ↳ E.G. An object with 10 constructor arguments
  ↳ Makes the creation process more understandable and easier to use 
*/

class Person {
  streetAddress: string;
  postcode: string;
  city: string;
  companyName: string;
  position: string;
  annualIncome: number;

  constructor() {
    // address info
    this.streetAddress = this.postcode = this.city = '';

    // employment info
    this.companyName = this.position = '';
    this.annualIncome = 0;
  }

  toString(): string {
    return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n` +
      `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`;
  }
}

// For very complicated objects, you may need to use multiple builders

class PersonBuilder {
  protected person: Person;

  constructor(person: Person = new Person()) {
    this.person = person;
  }

  // returns an address builder
  get lives(): PersonAddressBuilder {
    return new PersonAddressBuilder(this.person);
  }

  // returns a job details builder
  get works(): PersonJobBuilder {
    return new PersonJobBuilder(this.person);
  }

  build(): Person {
    return this.person;
  }
}

// This is a fluent builder.
// It returns the instance of the builder in every method - allows method chaining
class PersonJobBuilder extends PersonBuilder {
  constructor(person: Person) {
    super(person);
  }

  at(companyName: string): this {
    this.person.companyName = companyName;
    return this;
  }

  asA(position: string): this {
    this.person.position = position;
    return this;
  }

  earning(annualIncome: number): this {
    this.person.annualIncome = annualIncome;
    return this;
  }
}

// This is a fluent builder.
// It returns the instance of the builder in every method - allows method chaining
class PersonAddressBuilder extends PersonBuilder {
  constructor(person: Person) {
    super(person);
  }

  at(streetAddress: string): this {
    this.person.streetAddress = streetAddress;
    return this;
  }

  withPostcode(postcode: string): this {
    this.person.postcode = postcode;
    return this;
  }

  in(city: string): this {
    this.person.city = city;
    return this;
  }
}

let pb = new PersonBuilder();
let person = pb
  .lives.at('123 London Road').in('London').withPostcode('SW12BC')
  .works.at('Fabrikam').asA('Engineer').earning(123000)
  .build();
console.log(person.toString());

