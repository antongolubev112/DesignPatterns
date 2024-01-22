# Design Patterns in TypeScript
This repository was used to study and learn design patterns, along with principles using TypeScript.  
Below is a summary of what was learned.

## Patterns
## Creational Patterns
1. **Builder:** used for piece wise construction of objects that are complicated to create. For example, an object with 10 constructor arguments. It makes the creation process understandable and easy to use for such objects.
2. **Factory:** used for whole object creation (as opposed to piece wise). It is used when object creation logic becomes too complicated. Since constructors cannot be overloaded in JavaScript, complicated constructors can turn into 'optional parameter hell'. This pattern eliminates this.
3. **Prototype:** used to copy an existing object that is complicated to create. A prototype is a partially or fully initialised object that you can copy and use. This pattern can be combined with a Factory to create an easy to use API that creates/copies objects.
4. **Singleton:** used to make sure a class/object can only have a single instance in the entire application. It is good to use hen a constructor call is expensive e.g. a DB repo or an object factory.

## Structural Patterns
1. **Adapter:** used to "adapt" / transform a given interface into another interface.
2. **Bridge:** used to connect different components together through abstractions. It prevents a "cartesian product" complexity explosion (an unscalable number of derived classes).
3. **Composite:** used to treat both single (scalar) and composite objects uniformly. i.e. class `Foo` and `Foo[]` will have the same API.
4. **Decorator:** used to add additional behavior to a class without modifying or inheriting from it. You can compose decorators i.e. wrap a decorator in another decorator.
5. **Facade:** used to provide a simple and easy to use API for a complex sub system.
6. **Flyweight:** used to avoid redundancy when storing data. It is a space optimisation technique that externally stores data associated with multiple similar objects.
7. **Proxy:** Use to contorl access to an object by creating an intermidiary (proxy) for said object. It adds an additional layer of control without changing its functionality.

## Structural Patterns
1. **Chain of Responsibility:** Used to create a chain of objects that either handle the request or pass it to the next object in the chain.



