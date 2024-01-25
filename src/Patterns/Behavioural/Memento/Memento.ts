/*
    A memento is a token/handle representing the system state.
    It is in other words a snapshot of the current system state.

    There is one drawback to this approach. We can never restore to the original state.
    This is because we cannot return a memento from the bank account constructor.
*/
class Memento {
  balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }
}

class BankAccount {
  balance: number;

  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount: number): Memento {
    this.balance += amount;
    return new Memento(this.balance);
  }

  restore(m: Memento): void {
    this.balance = m.balance;
  }

  toString(): string {
    return `Balance: ${this.balance}`;
  }
}

let ba = new BankAccount(100);
let m1 = ba.deposit(50);
let m2 = ba.deposit(25);
console.log(ba.toString());

// restore to m1
ba.restore(m1);
console.log(ba.toString());

// restore to m2
ba.restore(m2);
console.log(ba.toString());
