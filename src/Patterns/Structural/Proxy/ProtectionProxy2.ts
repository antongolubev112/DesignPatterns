class Person
{
  age: number;
  constructor(age=0)
  {
    this.age = age;
    console.log("Age: "+age)
  }

  drink() { return 'drinking'; }
  drive() { return 'driving'; }
  drinkAndDrive() { return 'driving while drunk'; }
  
  toString(){
      return `Person's age is ${this.age}`
  }
}

class ResponsiblePerson
{
  person: Person;
  constructor(person: Person)
  {
    this.person = person;
    console.log(person.toString())
  }
  
  drink(){
      console.log("Drink() "+this.person.toString())
      if(this.person.age<18){
          return "too young";
      }else{
          return this.person.drink();
      }
  }
  
  drive(){
      console.log("drive() "+this.person.toString())
      if(this.person.age<16){
          return "too young";
      }else{
          return this.person.drive();
      }
  }
  
  drinkAndDrive(){
      return "dead";
  }
  
  // Getter for age
  get age() {
    return this.person.age;
  }
}