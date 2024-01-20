/*
 Composite pattern: treat individual objects and compositions of objects uniformly.
 The GraphicObject class can either be a single (scalar) object or a group of objects.
*/

class GraphicObject {
  private static count: number = 0;
  private _name: string;
  public children: GraphicObject[] = [];
  public color: string | undefined;

  constructor(name: string = "Group " + GraphicObject.count++) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  print(buffer: string[], depth: number): void {
    buffer.push("*".repeat(depth));
    if (depth > 0) buffer.push(" ");
    if (this.color) buffer.push(this.color + " ");
    buffer.push(this.name);
    buffer.push("\n");

    for (let child of this.children) child.print(buffer, depth + 1);
  }

  toString(): string {
    let buffer = [];
    this.print(buffer, 0);
    return buffer.join("");
  }
}

class Circle extends GraphicObject {
  constructor(color: string) {
    super("Circle");
    this.color = color;
  }
}

class Square extends GraphicObject {
  constructor(color: string) {
    super("Square");
    this.color = color;
  }
}

const drawing = new GraphicObject();
drawing.children.push(new Square("Red"));
drawing.children.push(new Circle("Yellow"));

const group = new GraphicObject();
group.children.push(new Circle("Blue"));
group.children.push(new Square("Blue"));
drawing.children.push(group);

console.log(drawing.toString());
