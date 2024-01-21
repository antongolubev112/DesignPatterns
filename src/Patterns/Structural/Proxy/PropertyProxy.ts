/*
    A property proxy is a class that provides a wrapper/interface to another object.
    In this example, we create a Property class that wraps a value and provides a getter and a setter for it.
*/
class Property<T> {
  private _value: T;
  public name: string;

  constructor(value: T, name: string = "") {
    this._value = value;
    this.name = name;
  }

  get value(): T {
    return this._value;
  }

  // This is the proxy part of the pattern.
  // It allows us to add additional logic to the setter.
  set value(newValue: T) {
    if (this._value === newValue) return;
    console.log(`Assigning ${newValue} to ${this.name}`);
    this._value = newValue;
  }
}

class Creature {
  private _agility: Property<number>;

  constructor() {
    this._agility = new Property<number>(10, "agility");
  }

  get agility(): number {
    return this._agility.value;
  }
  set agility(value: number) {
    this._agility.value = value;
  }
}

let c = new Creature();
c.agility = 12;
c.agility = 13;
