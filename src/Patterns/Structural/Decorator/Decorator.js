/*
    The decorator pattern allows behavior to be added to an individual object, dynamically, without affecting the behavior of other objects from the same class.
    I.E. it adds behaviour to a class without modifying it.

    In this example, we have a base class of Shape, and two derived classes: Circle and Square.
    Say we want to add a color to a shape. A very intrusive way to do it would be to add a color property to the Shape class.

    A better way to do this, would be to add a decorator class, which takes a shape and adds a color to it.
*/

class Shape {
/*
  Intrusive way of adding a color property to the Shape class.
  It requires you to modify the entire inheritance tree.
  This violates the Open-Closed Principle.

  constructor(color) {
    this.color = color;
  }
*/
}


class Circle extends Shape
{
  constructor(radius=0)
  {
    super();
    this.radius = radius;
  }

  resize(factor)
  {
    this.radius *= factor;
  }

  toString()
  {
    return `A circle of radius ${this.radius}`;
  }
}

class Square extends Shape
{
  constructor(side=0)
  {
    super();
    this.side = side;
  }

  toString()
  {
    return `A square with side ${this.side}`;
  }
}

/*
  Decorator class, which takes a shape and adds a color to it.
*/
class ColoredShape extends Shape
{
  constructor(shape, color)
  {
    super();
    this.shape = shape;
    this.color = color;
  }

  toString()
  {
    return `${this.shape.toString()} ` +
      `has the color ${this.color}`;
  }
}

class TransparentShape extends Shape
{
  constructor(shape, transparency)
  {
    super();
    this.shape = shape;
    this.transparency = transparency;
  }

  toString()
  {
    return `${this.shape.toString()} has ` +
      `${this.transparency * 100.0}% transparency`;
  }
}

let circle = new Circle(2);
console.log(circle.toString());

let redCircle = new ColoredShape(circle, 'red');
console.log(redCircle.toString());

/*
  We can also compose decorators. Which means we can wrap a decorator around another decorator.
  Here we wrap a transparent shape around a red circle to make a red half circle.
*/
let redHalfCircle = new TransparentShape(redCircle, 0.5);
console.log(redHalfCircle.toString());

/*
  This implementation is not perfect.
  Every decorator loses the ability to call methods on the original object.
  This means that we can't call resize on the redHalfCircle, since it is not a Circle. It is just a Shape.
  Also, there is nothing stopping us from applying the same decorator twice. 
  E.G. we can make a coloredShape of a coloredShape, which is not what we want.  
*/

// impossible: redHalfCircle is not a Circle
// redHalfCircle.resize(2);
redHalfCircle.shape.resize(2);

