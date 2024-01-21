/*
    This class can be problematic if you have many users with the same name e.g. "Adam Smith".
    This is inefficient in terms of memory usage.
    It would be better to have a single instance of the name "Adam Smith" and then just use pointers.
*/
class User {
  fullName: string;

  constructor(fullName: string) {
    this.fullName = fullName;
  }
}

/*
    This is a flyweight class.
    There is a common pool of strings and each user has an index into this pool.
    This is a much more efficient way of storing users' names.
*/
class User2 {
  static strings: string[] = [];
  names: number[];

  constructor(fullName: string) {
    let getOrAdd = (s: string) => {
      let idx = User2.strings.indexOf(s);
      if (idx !== -1) return idx;
      else {
        User2.strings.push(s);
        return User2.strings.length - 1;
      }
    };

    //names is an array of indexes into the strings (names) array
    this.names = fullName.split(" ").map(getOrAdd);
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

let randomString = function (): string {
  let result: string[] = [];
  for (let x = 0; x < 10; ++x)
    result.push(String.fromCharCode(65 + getRandomInt(26)));
  return result.join("");
};

let users: User[] = [];
let users2: User2[] = [];
let firstNames: string[] = [];
let lastNames: string[] = [];

// generate 100 first/last names
for (let i = 0; i < 100; ++i)
{
  firstNames.push(randomString());
  lastNames.push(randomString());
}

// make 10k users
for (let first of firstNames)
  for (let last of lastNames) {
    users.push(new User(`${first} ${last}`));
    users2.push(new User2(`${first} ${last}`));
  }

// this is a ballpark comparison of memory used by the 10k users (very unscientific)
// The flyweight pattern uses much less memory - less than half as much in this case.
console.log(`10k users take up approx ` +
  `${JSON.stringify(users).length} chars`);

let users2length: number =
  [users2, User2.strings].map(x => JSON.stringify(x).length)
    .reduce((x,y) => x+y);
console.log(`10k flyweight users take up approx ` +
  `${users2length} chars`);
