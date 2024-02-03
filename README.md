# Design Patterns in TypeScript
This repository was used to study and learn design patterns, along with principles using TypeScript.  
Below is a summary of what was learned.

# Patterns
## Creational Patterns
1. **Builder:** Used for piece wise construction of objects that are complicated to create. For example, an object with 10 constructor arguments. It makes the creation process understandable and easy to use for such objects.
2. **Factory:** Used for whole object creation (as opposed to piece wise). It is used when object creation logic becomes too complicated. Since constructors cannot be overloaded in JavaScript, complicated constructors can turn into 'optional parameter hell'. This pattern eliminates this.
3. **Prototype:** Used to copy an existing object that is complicated to create. A prototype is a partially or fully initialised object that you can copy and use. This pattern can be combined with a Factory to create an easy to use API that creates/copies objects.
4. **Singleton:** Used to make sure a class/object can only have a single instance in the entire application. It is good to use hen a constructor call is expensive e.g. a DB repo or an object factory.

## Structural Patterns
1. **Adapter:** Used to "adapt" / transform a given interface into another interface.
2. **Bridge:** Used to connect different components together through abstractions. It prevents a "cartesian product" complexity explosion (an unscalable number of derived classes).
3. **Composite:** Used to treat both single (scalar) and composite objects uniformly. i.e. class `Foo` and `Foo[]` will have the same API.
4. **Decorator:** Used to add additional behavior to a class without modifying or inheriting from it. You can compose decorators i.e. wrap a decorator in another decorator.
5. **Facade:** Used to provide a simple and easy to use API for a complex sub system.
6. **Flyweight:** Used to avoid redundancy when storing data. It is a space optimisation technique that externally stores data associated with multiple similar objects.
7. **Proxy:** Used to control access to an object by creating an intermidiary (proxy) for said object. It adds an additional layer of control without changing its functionality.

## Structural Patterns
1. **Chain of Responsibility:** Used to create a chain of objects that either handle the request or pass it to the next object in the chain.
2. **Command:** Used to create an object that represents an operation. This allows you to record these operations, which allows auditing, rollbacks, undo and redo operations.
3. **Interpreter:** Used to create a component that processes structured text data. This pattern uses lexing to represent text as meaningful OOP constructs, which allows us to parse and traverse it.
4. **Iterator:** Used to facilitate iteration / traversal of a class.
5. **Mediator:** Used to allow ephemeral components to refer to a mediator - a central component that facilitates communication Used when components go in and out of a system at any time e.g. chat room participants.
6. **Memento:** Used to keep a snapshot of an object's state. It allows us to use this snapshot to revert the object to said state.
7. **Observer:** Allows us to listen to events and to be notified when they occur.
8. **State:** Used to create an object who's behaviour is dictated by its state. A construct that manages states and transitions is called a state machine.
9. **Strategy:** Used to enable the exact behaviour of a system to be determined at runtime. It abstracts the high level parts out of algorithms, and lets the implementors decide the lower level details.
10. **Template:** Used to create a high level blueprint for an algorithm and lets the details be completed by the inheritors. Similar to the Strategy pattern, but **Template uses inheritance while Strategy uses composition.**
11. **Visitor**: Used to add extra behaviour to an entire hierarchy of classes. A visitor knows how to traverse a data structure composed of types.




