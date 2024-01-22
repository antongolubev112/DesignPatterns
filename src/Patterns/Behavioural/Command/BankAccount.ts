enum Action {
  deposit = 1,
  withdraw = 2,
}

class BankAccount {
  private static overdraftLimit = -500;
  private balance: number;

  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`Deposited ${amount}, balance is now ${this.balance}`);
  }

  withdraw(amount: number): boolean {
    if (this.balance - amount >= BankAccount.overdraftLimit) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}, balance is now ${this.balance}`);
      return true;
    }
    return false;
  }

  toString(): string {
    return `Balance: ${this.balance}`;
  }
}

/*
    The Command Pattern.
    It allows you to record that an action took place.
*/
class BankAccountCommand {
  private account: BankAccount;
  private action: Action;
  private amount: number;
  private succeeded: boolean;

  constructor(account: BankAccount, action: Action, amount: number) {
    this.account = account;
    this.action = action;
    this.amount = amount;
    this.succeeded = false;
  }

  call(): void {
    switch (this.action) {
      case Action.deposit:
        this.account.deposit(this.amount);
        this.succeeded = true;
        break;
      case Action.withdraw:
        this.succeeded = this.account.withdraw(this.amount);
        break;
    }
  }

  undo(): void {
    if (!this.succeeded) return;
    switch (this.action) {
      case Action.deposit:
        this.account.withdraw(this.amount);
        break;
      case Action.withdraw:
        this.account.deposit(this.amount);
        break;
    }
  }
}

let ba = new BankAccount(100);
let cmd = new BankAccountCommand(ba, Action.deposit, 50);
cmd.call();
console.log(ba.toString());

console.log("Performing undo:");
cmd.undo();
console.log(ba.toString());
