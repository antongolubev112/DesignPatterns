/* 
    The constructor checks if an instance already exists.
    If an instance doesn't exist, it stores the instance from the current object.
    If it does exist, it returns the stored instance.
 */

class Singleton {
  private static instance: Singleton | null = null;

  constructor() {
    const instance = Singleton.instance;
    if (instance) {
      return instance;
    }

    Singleton.instance = this;
  }

  foo() {
    console.log("Doing something...");
  }
}

let s1 = new Singleton();
let s2 = new Singleton();
console.log("Are they identical? " + (s1 === s2));
s1.foo();
