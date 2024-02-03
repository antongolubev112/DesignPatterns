/*
    Reflective Visitor Pattern.
    The visitor is a component that knows how to traverse a data structure composed of (possibly related) types.

    In this code we have a separate component that knows how to traverse a data structure of expressions.
    This component handles the printing of the expression.
*/

interface Expression {
}

class NumberExpression implements Expression {
    value: number;
    constructor(value: number) {
        this.value = value;
    }
}

class AdditionExpression implements Expression {
    left: Expression;
    right: Expression;
    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }
}

class ExpressionPrinter {
    print(e: Expression, buffer: string[]) {
        if (e instanceof NumberExpression) {
            buffer.push(e.value.toString());
        }
        else if (e instanceof AdditionExpression) {
            buffer.push('(');
            this.print(e.left, buffer);
            buffer.push('+');
            this.print(e.right, buffer);
            buffer.push(')');
        }
    }
}

let e: Expression = new AdditionExpression(
    new NumberExpression(1),
    new AdditionExpression(
        new NumberExpression(2),
        new NumberExpression(3)
    )
);
let buffer: string[] = [];
let ep = new ExpressionPrinter();
ep.print(e, buffer);
console.log(buffer.join(''));