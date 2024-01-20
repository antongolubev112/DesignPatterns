/*
    In this example, you have a base type called Shape.
    Circle class is derived from shape.

    You have different ways of rendering circles. You can do it using vectors or rasters (pixels).
    Without the use of a Bridge Pattern, you can end up with the following derived classes:

    VectorCircle, RasterCircle.

    Image you also had a square class.
    Then you would end up with more derived classes:

    VectorSquare, RasterSquare

    The more classes that derive from shape, the more derived classes you will have. (cartesian product).
    This does not scale.
*/

class Shape {
  // taking a renderer in the constructor allows you to specify what renderer to use.
  // bridge pattern
  protected renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }
}

class Circle extends Shape {
  private radius: number;

  constructor(renderer: Renderer, radius: number) {
    super(renderer);
    this.radius = radius;
  }

  //using the renderer passed in the constructor to draw the shape
  draw(): void {
    this.renderer.renderCircle(this.radius);
  }

  resize(factor: number): void {
    this.radius *= factor;
  }
}

/*
    To avoid a cartesian product of derived classes, we create a bridge between the two hierarchies:
    1st Hierarchy is Shape, 2nd is Renderer.
*/

interface Renderer {
  renderCircle(radius: number): void;
}

class VectorRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log(`Drawing a circle of radius ${radius}`);
  }
}

class RasterRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log(`Drawing pixels for circle of radius ${radius}`);
  }
}

// Example usage
let raster = new RasterRenderer();
let vector = new VectorRenderer();
let circle = new Circle(vector, 5);

circle.draw(); // Drawing a circle of radius 5
circle.resize(2);
circle.draw(); // Drawing a circle of radius 10
