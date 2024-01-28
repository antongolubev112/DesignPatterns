/*
    This file implements the Observer pattern using a property observer.
    The observer is notified when the age property of a person object is changed.
*/
class Event {
  private handlers: Map<number, (sender: any, args: any) => void>;
  private count: number;

  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler: (sender: any, args: any) => void): number {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx: number): void {
    this.handlers.delete(idx);
  }

  // 1) who fired the event?
  // 2) additional data (event args)
  fire(sender: any, args: any): void {
    this.handlers.forEach((v, k) => v(sender, args));
  }
}

class PropertyChangedArgs {
  name: string;
  newValue: any;

  constructor(name: string, newValue: any) {
    this.name = name;
    this.newValue = newValue;
  }
}

class Person {
  private _age: number;
  public propertyChanged: Event;

  constructor(age: number) {
    this._age = age;
    this.propertyChanged = new Event();
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (!value || this._age === value) return;
    this._age = value;

    // Fire the event to all subscribers
    this.propertyChanged.fire(this, new PropertyChangedArgs("age", value));
  }
}

/*
    This class is the observer. It is a handler that subscribes to the propertyChanged event of the person object passed to the constructor.
*/
class RegistrationChecker {
  private person: Person;
  private token: number;

  constructor(person: Person) {
    this.person = person;
    this.token = person.propertyChanged.subscribe(this.age_changed.bind(this));
  }

  age_changed(sender: Person, args: PropertyChangedArgs): void {
    if (sender === this.person && args.name === "age") {
      if (args.newValue < 13) {
        console.log(`Sorry, you are still too young`);
      } else {
        console.log(`Okay, you can register`);
        sender.propertyChanged.unsubscribe(this.token);
      }
    }
  }
}

let person = new Person(20);
let checker = new RegistrationChecker(person);
for (let i = 10; i < 20; ++i) {
  console.log(`Changing age to ${i}`);
  person.age = i;
}
