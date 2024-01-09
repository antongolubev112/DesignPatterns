/*
    Monostate is similar to a Singleton, except there is no special constructor.
    Monostate instances share all their data.
    All properties are dstatic
*/

class CEO {
  private static _name: string | undefined;
  private static _age: number | undefined;

  get name(): string | undefined {
    return CEO._name;
  }
  set name(value: string | undefined) {
    CEO._name = value;
  }

  get age(): number | undefined {
    return CEO._age;
  }
  set age(value: number | undefined) {
    CEO._age = value;
  }

  toString(): string {
    return `CEO's name is ${this.name} ` + `and he is ${this.age} years old.`;
  }
}

let ceo = new CEO();
ceo.name = "Adam Smith";
ceo.age = 55;

let ceo2 = new CEO();
ceo2.name = "John Gold";
ceo2.age = 66;

console.log(ceo.toString());
console.log(ceo2.toString());
