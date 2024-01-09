/*
  Builder Pattern is used for piece wise object creation.
  Use when your objects are complicated to create.
  ↳ E.G. An object with 10 constructor arguments
  ↳ Makes the creation process more understandable and easier to use 
*/
class Tag {
  static get indentSize(): number {
    return 2;
  }

  name: string;
  text: string;
  children: Tag[] = [];

  constructor(name: string = '', text: string = '') {
    this.name = name;
    this.text = text;
  }

  private toStringImpl(indent: number): string {
    let html: string[] = [];
    const i = ' '.repeat(indent * Tag.indentSize);
    html.push(`${i}<${this.name}>\n`);
    if (this.text.length > 0) {
      html.push(' '.repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
      html.push('\n');
    }

    for (const child of this.children) {
      html.push(child.toStringImpl(indent + 1));
    }

    html.push(`${i}</${this.name}>\n`);
    return html.join('');
  }

  toString(): string {
    return this.toStringImpl(0);
  }

  static create(name: string): HtmlBuilder {
    return new HtmlBuilder(name);
  }
}

class HtmlBuilder {
  private root: Tag;
  private rootName: string;

  constructor(rootName: string) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  // non-fluent - does not return the factory instance
  // cannot chain methods of the builder
  addChild(childName: string, childText: string): void {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  // fluent - returns the factory instance
  // allows you to chain builder methods
  addChildFluent(childName: string, childText: string): HtmlBuilder {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  toString(): string {
    return this.root.toString();
  }

  clear(): void {
    this.root = new Tag(this.rootName);
  }

  build(): Tag {
    return this.root;
  }
}

// HTML paragraph creation without use of a builder.
const hello = 'hello';
let html: string[] = [];
html.push('<p>');
html.push(hello);
html.push('</p>');
console.log(html.join());

// HTML list creation without use of a builder.
const words = ['hello', 'world'];
html = [];
html.push('<ul>\n');
for (const word of words) html.push(`  <li>${word}</li>\n`);
html.push('</ul>');
console.log(html.join());

// ordinary non-fluent builder
let builder = Tag.create('ul');
for (const word of words) builder.addChild('li', word);
let tag = builder.build();
console.log(tag.toString());

// fluent builder - allows method chaining
builder.clear();
builder
  .addChildFluent('li', 'foo')
  .addChildFluent('li', 'bar')
  .addChildFluent('li', 'baz');
console.log(builder.toString());

