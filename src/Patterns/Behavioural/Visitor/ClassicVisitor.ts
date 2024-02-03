/*
    This approach is better than the other two examples because is it scalable.
    If for example, we want to add a new operation, we just need to add a new class that extends the Visitor class and override the visit methods.
*/

interface Expression {
    accept(visitor: Visitor): void;
}

interface Visitor {
    visitNumber(e: NumberExpression): void;
    visitAddition(e: AdditionExpression): void;
}

class NumberExpression implements Expression {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    accept(visitor: Visitor) {
        visitor.visitNumber(this);
    }
}

class AdditionExpression implements Expression {
    left: Expression;
    right: Expression;

    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    accept(visitor: Visitor) {
        visitor.visitAddition(this);
    }
}

class VisitorClass implements Visitor {
    buffer: string[] = [];

    visitNumber(e: NumberExpression) {
        this.buffer.push(e.value.toString());
    }

    visitAddition(e: AdditionExpression) {
        this.buffer.push('(');
        e.left.accept(this);
        this.buffer.push('+');
        e.right.accept(this);
        this.buffer.push(')');
    }
}

class ExpressionPrinter extends VisitorClass {
    toString() {
        return this.buffer.join('');
    }
}

class ExpressionCalculator implements Visitor {
    // this visitor is stateful which can lead to problems
    result: number = 0;

    visitNumber(e: NumberExpression) {
        this.result = e.value;
    }

    visitAddition(e: AdditionExpression) {
        e.left.accept(this);
        let temp = this.result;
        e.right.accept(this);
        this.result += temp;
    }
}

let e: Expression = new AdditionExpression(
    new NumberExpression(1),
    new AdditionExpression(
        new NumberExpression(2),
        new NumberExpression(3)
    )
);

var ep: ExpressionPrinter = new ExpressionPrinter();
ep.visitAddition(e as AdditionExpression);

var ec: ExpressionCalculator = new ExpressionCalculator();
ec.visitAddition(e as AdditionExpression);

console.log(
    `${ep.toString()} = ${ec.result}`
);