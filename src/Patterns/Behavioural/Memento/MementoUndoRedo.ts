/*
    This approach shows how to implement undo/redo functionality using the Memento pattern.
    We do this by storing every single change to a bank account object.
*/

class Memento {
  balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }
}

class BankAccount {
  private balance: number;
  private changes: Memento[];
  private current: number;

  constructor(balance = 0) {
    this.balance = balance;

    // This saves the initial state of the bank account
    this.changes = [new Memento(balance)];

    // This is the current position in the changes array.
    this.current = 0;
  }

  // Create and store a new memento.
  // Increment the current position.
  deposit(amount: number): Memento {
    this.balance += amount;
    let m = new Memento(this.balance);
    this.changes.push(m);
    this.current++;
    return m;
  }

  restore(m: Memento): void {
    if (m) {
      this.balance = m.balance;
      this.changes.push(m);
      this.current = this.changes.length - 1;
    }
  }

  undo(): Memento | null {
    if (this.current > 0) {
      // Decrement the current position before we return the memento.
      let m = this.changes[--this.current];
      this.balance = m.balance;
      return m;
    }
    return null;
  }

  redo(): Memento | null {
    if (this.current + 1 < this.changes.length) {
      let m = this.changes[++this.current];
      this.balance = m.balance;
      return m;
    }
    return null;
  }

  toString(): string {
    return `Balance: $${this.balance}`;
  }
}

let ba = new BankAccount(100);
ba.deposit(50);
ba.deposit(25);
console.log(ba.toString());

ba.undo();
console.log(`Undo 1: ${ba.toString()}`);
ba.undo();
console.log(`Undo 2: ${ba.toString()}`);
ba.redo();
console.log(`Redo 2: ${ba.toString()}`);
