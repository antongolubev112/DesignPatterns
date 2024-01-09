/*
    This code merges the prototype and factory design patterns.
    Reason: Can have predefined objects and a nice API to customize and create/copy objects.
*/

class Address {
  constructor(public suite: number | null, public streetAddress: string, public city: string) {}

  toString(): string {
    return `Suite ${this.suite}, ` +
      `${this.streetAddress}, ${this.city}`;
  }
}

class Employee {
  constructor(public name: string, public address: Address) {}

  toString(): string {
    return `${this.name} works at ${this.address}`;
  }

  greet(): void {
    console.log(
      `Hi, my name is ${this.name}, ` +
      `I work at ${this.address.toString()}`
    );
  }
}

class Serializer {
  constructor(private types: any[]) {}

  markRecursive(object: any): void {
    // anoint each object with a type index
    let idx = this.types.findIndex(t => {
      return t.name === object.constructor.name;
    });
    if (idx !== -1) {
      object['typeIndex'] = idx;

      for (let key in object) {
        // the null check is important because customized properties will be null
        if (object.hasOwnProperty(key) && object[key] != null) {
          this.markRecursive(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object: any): any {
    if (object.hasOwnProperty('typeIndex')) {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object: any): any {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

class EmployeeFactory {
  static serializer: Serializer;
  static main: Employee; 
  static aux: Employee;

  // creates a copy of the object using the Serializer and a predefined prototype
  private static _newEmployee(proto: Employee, name: string, suite: number): Employee {
    let copy = EmployeeFactory.serializer.clone(proto);
    copy.name = name;
    copy.address.suite = suite;
    return copy;
  }

  // Factory method
  static newMainOfficeEmployee(name: string, suite: number): Employee {
    return this._newEmployee(EmployeeFactory.main, name, suite);
  }

  // Factory method
  static newAuxOfficeEmployee(name: string, suite: number): Employee {
    return this._newEmployee(EmployeeFactory.aux, name, suite);
  }
}

EmployeeFactory.serializer = new Serializer([Employee, Address]);

// This is a prototype - leaving properties that will be customized as null
EmployeeFactory.main = new Employee(null,
  new Address(null, '123 East Dr', 'London'));

// This is a prototype - leaving properties that will be customized as null
EmployeeFactory.aux = new Employee(null,
  new Address(null, '200 London Road', 'Oxford'));

// Create new employees using the factory methods
let john = EmployeeFactory.newMainOfficeEmployee('John', 4321);
let jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 222);

console.log(john.toString());
console.log(jane.toString());
