/*
    The following code demonstrates how to create a prototype and avoid creating a deep copy method for
    each composite object, as shown in ExplicitCopying.js.

    This can be done through serialization.
*/
class Address
{
  constructor(streetAddress, city, country) {
    this.streetAddress = streetAddress;
    this.city = city;
    this.country = country;
  }

  toString()
  {
    return `Address: ${this.streetAddress}, ` +
      `${this.city}, ${this.country}`;
  }
}

class Person
{
  constructor(name, address)
  {
    this.name = name;
    this.address = address; //!
  }

  toString()
  {
    return `${this.name} lives at ${this.address}`;
  }

  greet()
  {
    console.log(
      `Hi, my name is ${this.name}, ` +
      `I live at ${this.address.toString()}`
    );
  }
}

class Serializer
{
  // Serializer will be aware of each type it can serialize
  // This is a limitation - you need to be aware of every type you can serialize
  constructor(types){
    this.types = types;
  }

  // JSON has no knowledge of class types
  // This function will match the object to a known type
  markRecursive(object)
  {
    // anoint each object with a type index
    let idx = this.types.findIndex(t => {
      return t.name === object.constructor.name;
    });
    if (idx !== -1)
    {
      object['typeIndex'] = idx;

      for (let key in object)
      {
        if (object.hasOwnProperty(key) && object[key] != null)
          this.markRecursive(object[key]);
      }
    }
  }

  //Construct a copy of the matched type using the passed JSON
  reconstructRecursive(object)
  {
    if (object.hasOwnProperty('typeIndex'))
    {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for (let key in object)
      {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object)
  {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

let john = new Person('John',
  new Address('123 London Road', 'London', 'UK'));

// Bad approach - serialization through JSON.
// JSON has no relation to the class "Person"
let jane = JSON.parse(JSON.stringify(john));

jane.name = 'Jane';
jane.address.streetAddress = '321 Angel St';

// this won't work
// jane.greet();

// try a dedicated serializer
let s = new Serializer([Person,Address]); // pain point - not the best approach
jane = s.clone(john);

jane.name = 'Jane';
jane.address.streetAddress = '321 Angel St';

console.log(john.toString());
console.log(jane.toString());