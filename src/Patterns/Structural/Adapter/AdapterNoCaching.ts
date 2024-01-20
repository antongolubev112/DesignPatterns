/*
    In this example, suppose the following scenario:
    You are using line and vector objects in your application.

    Then, you are given an API that draws points. 
    You need a way to convert your vectors into points.
    Need to use an adapter for this.
*/

class Point {
  constructor(public x: number, public y: number) {}

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}

class Line {
  constructor(public start: Point, public end: Point) {}

  toString(): string {
    return `${this.start.toString()}→${this.end.toString()}`;
  }
}

class VectorObject extends Array<Line> {}

class VectorRectangle extends VectorObject {
  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.push(new Line(new Point(x, y), new Point(x + width, y)));
    this.push(
      new Line(new Point(x + width, y), new Point(x + width, y + height))
    );
    this.push(new Line(new Point(x, y), new Point(x, y + height)));
    this.push(
      new Line(new Point(x, y + height), new Point(x + width, y + height))
    );
  }
}

// ↑↑↑ this is your API ↑↑↑

// ↓↓↓ this is what you have to work with ↓↓↓

let vectorObjects: VectorObject[] = [
  new VectorRectangle(1, 1, 10, 10),
  new VectorRectangle(3, 3, 6, 6),
];

let drawPoint = function (point: Point): void {
  process.stdout.write(".");
};

// To draw our vector objects, we need an adapter

class LineToPointAdapter extends Array<Point> {
  static count = 0;

  constructor(line: Line) {
    super();
    console.log(
      `${LineToPointAdapter.count++}: Generating ` +
        `points for line ${line.toString()} (no caching)`
    );

    let left = Math.min(line.start.x, line.end.x);
    let right = Math.max(line.start.x, line.end.x);
    let top = Math.min(line.start.y, line.end.y);
    let bottom = Math.max(line.start.y, line.end.y);

    if (right - left === 0) {
      for (let y = top; y <= bottom; ++y) {
        this.push(new Point(left, y));
      }
    } else if (line.end.y - line.start.y === 0) {
      for (let x = left; x <= right; ++x) {
        this.push(new Point(x, top));
      }
    }
  }
}

let drawPoints = function (): void {
  for (let vo of vectorObjects)
    for (let line of vo) {
      let adapter = new LineToPointAdapter(line);
      adapter.forEach(drawPoint);
    }
};

drawPoints();
drawPoints();
