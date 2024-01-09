const fs = require("fs");
const path = require("path");

/*
    Singleton Pattern can become problematic when you introduce it as a direct dependency.
*/

// Singleton database
// This is a low level module

class MyDatabase {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }

    this.constructor.instance = this;

    console.log(`Initializing database`);
    this.capitals = {};

    let lines = fs
      .readFileSync(path.join(__dirname, "capitals.txt"))
      .toString()
      .split("\r\n");

    for (let i = 0; i < lines.length / 2; ++i) {
      this.capitals[lines[2 * i]] = parseInt(lines[2 * i + 1]);
    }
  }

  getPopulation(city) {
    return this.capitals[city];
  }
}

/*
    The use of a singleton here is problematic for unit testing.
    We cannot switch out the real database for a dummy database.

    Dependency inversion principle is being broken. 
    This is a high level module. The database is a low level module.
    High level modules should not depend on low level modules.
 */
class SingletonRecordFinder {
  totalPopulation(cities) {
    return cities
      .map((city) => new MyDatabase().getPopulation(city))
      .reduce((x, y) => x + y);
  }
}

/*
    Better approach.
    Constructor lets you specify the database.
*/
class ConfigurableRecordFinder {
  constructor(database) {
    this.database = database;
  }

  totalPopulation(cities) {
    return cities
      .map((city) => this.database.getPopulation(city))
      .reduce((x, y) => x + y);
  }
}

class DummyDatabase {
  constructor() {
    this.capitals = {
      alpha: 1,
      beta: 2,
      gamma: 3,
    };
  }

  getPopulation(city) {
    // possible error handling here
    return this.capitals[city];
  }
}

describe("singleton database", function () {
  // This passes
  it("is a singleton", function () {
    const db1 = new MyDatabase();
    const db2 = new MyDatabase();
    expect(db1).toBe(db2);
  });

  /*
    Problem with this unit test: Brittle
    1. Brittle. It relies on a live database. The values in the database could change.
    This could cause the test to fail at a later point in time.

    2. Its really an integration test. 
    It is testing the record finder AND the database.
  */

  it("calculates total population", function () {
    let rf = new SingletonRecordFinder();
    let cities = ["Seoul", "Mexico City"];
    let tp = rf.totalPopulation(cities);
    expect(tp).toEqual(17400000 + 17500000);
  });

  /*
    Better unit test using a dummy DB
  */
  it("calculates total population better", function () {
    let db = new DummyDatabase();
    let rf = new ConfigurableRecordFinder(db);
    expect(rf.totalPopulation(["alpha", "gamma"])).toEqual(4);
  });
});
