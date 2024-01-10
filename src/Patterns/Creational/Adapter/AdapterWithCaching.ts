/*
    When we use an adapter pattern, we generate temporary objects.
    We can end up regenerating the same objects - duplicate work.
    To avoid this, we can implement caching
*/


// This method is used to compare strings for caching in the adapter.
function hashCode(str: string): number {
  if (Array.prototype.reduce) {
    return str.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  }
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const character = str.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash; // Convert to a 32-bit integer
  }
  return hash;
}

class Point {
  constructor(public x: number, public y: number) {}

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

class Line {
  constructor(public start: Point, public end: Point) {}

  toString() {
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

class LineToPointAdapter extends Array<Point> {
  private hash: number;
  private static count = 0;
  private static cache: { [key: number]: Point[] } = {};

  constructor(line: Line) {
    super();

    this.hash = hashCode(JSON.stringify(line));

    // if this line is already in the cache, return it
    if (LineToPointAdapter.cache[this.hash]) return; 

    console.log(
      `${LineToPointAdapter.count++}: Generating ` +
        `points for line ${line.toString()} (with caching)`
    );

    let points: Point[] = [];

    let left = Math.min(line.start.x, line.end.x);
    let right = Math.max(line.start.x, line.end.x);
    let top = Math.min(line.start.y, line.end.y);
    let bottom = Math.max(line.start.y, line.end.y);

    if (right - left === 0) {
      for (let y = top; y <= bottom; ++y) {
        points.push(new Point(left, y));
      }
    } else if (line.end.y - line.start.y === 0) {
      for (let x = left; x <= right; ++x) {
        points.push(new Point(x, top));
      }
    }

    LineToPointAdapter.cache[this.hash] = points;
  }

  get items() {
    return LineToPointAdapter.cache[this.hash];
  }
}

let vectorObjects: VectorObject[] = [
  new VectorRectangle(1, 1, 10, 10),
  new VectorRectangle(3, 3, 6, 6),
];

let drawPoint = function (point: Point) {
  process.stdout.write(".");
};

let draw = function () {
  for (let vo of vectorObjects) {
    for (let line of vo) {
      let adapter = new LineToPointAdapter(line);
      adapter.items.forEach(drawPoint);
    }
  }
};

draw();
draw();
