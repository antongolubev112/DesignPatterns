/*
  Builder Pattern is used for piece wise object creation.
  Use when your objects are complicated to create.
  ↳ E.G. An object with 10 constructor arguments
  ↳ Makes the creation process more understandable and easier to use 
*/
class Tag
{
  static get indentSize() { return 2; }

  constructor(name='', text='')
  {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toStringImpl(indent)
  {
    let html = [];
    let i = ' '.repeat(indent * Tag.indentSize);
    html.push(`${i}<${this.name}>\n`);
    if (this.text.length > 0)
    {
      html.push(' '.repeat(Tag.indentSize * (indent+1)));
      html.push(this.text);
      html.push('\n');
    }

    for (let child of this.children)
      html.push(child.toStringImpl(indent+1));

    html.push(`${i}</${this.name}>\n`);
    return html.join();
  }

  toString()
  {
    return this.toStringImpl(0);
  }

  static create(name)
  {
    return new HtmlBuilder(name);
  }
}

class HtmlBuilder
{
  constructor(rootName)
  {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  // non-fluent - does not return the factory instance
  // cannot chain methods of the builder
  addChild(childName, childText)
  {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  // fluent - returns the factory instance
  // allows you to chain builder methods
  addChildFluent(childName, childText)
  {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  toString()
  {
    return this.root.toString();
  }

  clear()
  {
    this.root = new Tag(this.rootName);
  }

  build()
  {
    return this.root;
  }
}

// HTML paragraph creation without use of a builder.
const hello = 'hello';
let html = [];
html.push('<p>');
html.push(hello);
html.push('</p>');
console.log(html.join());

// HTML list creation without use of a builder.
const words = ['hello', 'world'];
html = [];
html.push('<ul>\n');
for (let word of words)
  html.push(`  <li>${word}</li>\n`);
html.push('</ul>');
console.log(html.join());

// ordinary non-fluent builder
let builder = Tag.create('ul');
for (let word of words)
  builder.addChild('li', word);
let tag = builder.build();
console.log(tag.toString());

// fluent builder - allows method chaining
builder.clear();
builder
  .addChildFluent('li', 'foo')
  .addChildFluent('li', 'bar')
  .addChildFluent('li', 'baz');
console.log(builder.toString());
