interface Visitor {
    visitValue(int: Integer): void;
    visitAddition(ae: AdditionExpression): void;
    visitMultiplication(me: MultiplicationExpression): void;
  }
  
  abstract class Expression {
    abstract accept(visitor: Visitor): void;
  }
  
  class Integer extends Expression {
    value: number;
  
    constructor(value: number) {
      super();
      this.value = value;
    }
  
    accept(visitor: Visitor) {
      visitor.visitValue(this);
    }
  }
  
  class BinaryExpression extends Expression {
    lhs: Expression;
    rhs: Expression;
  
    constructor(lhs: Expression, rhs: Expression) {
      super();
      this.lhs = lhs;
      this.rhs = rhs;
    }
  
    accept(visitor: Visitor) {
      // Implement the accept method for BinaryExpression
      // You can leave it empty if BinaryExpression does not need to be visited
    }
  }
  
  class AdditionExpression extends BinaryExpression {
    constructor(lhs: Expression, rhs: Expression) {
      super(lhs, rhs);
    }
  
    accept(visitor: Visitor) {
      visitor.visitAddition(this);
    }
  }
  
  class MultiplicationExpression extends BinaryExpression {
    constructor(lhs: Expression, rhs: Expression) {
      super(lhs, rhs);
    }
  
    accept(visitor: Visitor) {
      visitor.visitMultiplication(this);
    }
  }
  
  class ExpressionPrinter implements Visitor {
    buffer: string[] = [];
  
    visitValue(int: Integer) {
      this.buffer.push(int.value.toString());
    }
  
    visitAddition(ae: AdditionExpression) {
      this.buffer.push('(');
      ae.lhs.accept(this);
      this.buffer.push('+');
      ae.rhs.accept(this);
      this.buffer.push(')');
    }
  
    visitMultiplication(me: MultiplicationExpression) {
      me.lhs.accept(this);
      this.buffer.push("*");
      me.rhs.accept(this);
    }
  
    toString() {
      return this.buffer.join("");
    }
  }