/*
    A protection proxy controls access to the original object. 
    Protection proxies are useful when objects should have different access rights.
*/

class Car {
  drive(): void {
    console.log("Car being driven");
  }
}

class CarProxy {
  private driver: Driver;
  private _car: Car;

  constructor(driver: Driver) {
    this.driver = driver;
    this._car = new Car();
  }

  drive(): void {
    if (this.driver.age >= 16) this._car.drive();
    else console.log("Driver too young");
  }
}

class Driver {
  public age: number;

  constructor(age: number) {
    this.age = age;
  }
}

let car: Car = new Car();
car.drive();

let car2: CarProxy = new CarProxy(new Driver(12)); 
car2.drive();

let car3: CarProxy = new CarProxy(new Driver(22)); 
car3.drive();