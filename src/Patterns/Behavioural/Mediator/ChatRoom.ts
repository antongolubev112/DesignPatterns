class Person {
  name: string;
  chatLog: string[];
  room: ChatRoom;

  constructor(name: string) {
    this.name = name;
    this.chatLog = [];
  }

  receive(sender: string, message: string): void {
    let s = `${sender}: '${message}'`;
    console.log(`[${this.name}'s chat session] ${s}`);
    this.chatLog.push(s);
  }

  say(message: string): void {
    this.room.broadcast(this.name, message);
  }

  pm(who: string, message: string): void {
    this.room.message(this.name, who, message);
  }
}

/*
    Mediator pattern.
    Here we have a chat room where people can join and send messages to each other.
    This allows us to facilitate communication between objects that may go in and out of the system at any time.
    The mediator pattern allows these objects to communicate without having references to each other.
 */
class ChatRoom {
  people: Person[];

  constructor() {
    this.people = [];
  }

  broadcast(source: string, message: string): void {
    for (let p of this.people)
      if (p.name !== source) p.receive(source, message);
  }

  join(p: Person): void {
    let joinMsg = `${p.name} joins the chat`;
    this.broadcast("room", joinMsg);
    p.room = this;
    this.people.push(p);
  }

  message(source: string, destination: string, message: string): void {
    for (let p of this.people)
      if (p.name === destination) p.receive(source, message);
  }
}

let room = new ChatRoom();

let john = new Person("John");
let jane = new Person("Jane");

room.join(john);
room.join(jane);

john.say("hi room");
jane.say("oh, hey john");

let simon = new Person("Simon");
room.join(simon);
simon.say("hi everyone!");

jane.pm("Simon", "glad you could join us!");
