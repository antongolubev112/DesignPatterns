/*
    A proxy over a simple value type.
    Why? To add functionality to a simple value type.
*/
class Percentage
{
  private percent: number;

  constructor(percent: number)
  {
    this.percent = percent; // 0 to 100
  }

  toString(): string
  {
    return `${this.percent}%`;
  }

  // Proxy method.
  // This method is called when the object is used in a mathematical expression.
  valueOf(): number
  {
    return this.percent/100;
  }
}

let fivePercent = new Percentage(5);
console.log(`${fivePercent} of 50 is ${50*fivePercent.valueOf()}`);