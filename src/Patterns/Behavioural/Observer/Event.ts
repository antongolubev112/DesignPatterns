type Handler = (sender: any, args: any) => void;

class Event {
  private handlers: Map<number, Handler>;
  private count: number;

  constructor() {
    // a handler is something that processes an event
    this.handlers = new Map();
    this.count = 0;
  }

  // This method takes a handler (callback function) that gets invoked when the event is fired.
  subscribe(handler: Handler): number {
    this.handlers.set(++this.count, handler);

    //return the index of the handler so that we can unsubscribe in the future.
    return this.count;
  }

  unsubscribe(idx: number): void {
    this.handlers.delete(idx);
  }

  // This method is called when we want to fire an event.
  // It executes the handlers/ callbacks that are subscribed to the event.
  // It passes the sender and additional data to the handlers.
  fire(sender: any, args: any): void {
    this.handlers.forEach((v, k) => v(sender, args));
  }
}

// Class representing the arguments/ data provided by the event of a person catching a cold
class FallsIllArgs {
  address: string;

  constructor(address: string) {
    this.address = address;
  }
}

// If a person falls ill, we want a notification.
class Person {
  address: string;
  fallsIll: Event;

  constructor(address: string) {
    this.address = address;
    this.fallsIll = new Event();
  }

  catchCold(): void {
    this.fallsIll.fire(this, new FallsIllArgs(this.address));
  }
}

let person = new Person("123 London Road");

let handler: Handler = (s, a: FallsIllArgs) => {
  console.log(`A doctor has been called to ${a.address}`);
};

let sub = person.fallsIll.subscribe(handler);

person.catchCold();
person.catchCold();

person.fallsIll.unsubscribe(sub);
person.catchCold();
