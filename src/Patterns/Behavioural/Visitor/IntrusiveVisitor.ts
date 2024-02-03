/*
    This is an example of an intrusive visitor.
    It is intrusive because we needed to modify each of the classes to add a print functionality.
*/

class NumberExpression {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    print(buffer: string[]): void {
        buffer.push(this.value.toString());
    }
}

class AdditionExpression {
    left: NumberExpression | AdditionExpression;
    right: NumberExpression | AdditionExpression;

    constructor(left: NumberExpression | AdditionExpression, right: NumberExpression | AdditionExpression) {
        this.left = left;
        this.right = right;
    }

    print(buffer: string[]): void {
        buffer.push('(');
        this.left.print(buffer);
        buffer.push('+');
        this.right.print(buffer);
        buffer.push(')');
    }
}

// 1 + (2+3)
let e = new AdditionExpression(
    new NumberExpression(1),
    new AdditionExpression(
        new NumberExpression(2),
        new NumberExpression(3)
    )
);

// the visitor is the buffer
// the intrusive approach requires modifying the original class
// this is impractical if the hierarchy is large and breaks the open-closed principle
let buffer: string[] = [];
e.print(buffer);
console.log(buffer.join(''));