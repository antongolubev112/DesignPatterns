/*
  This code shows how to implement the iterator pattern when there are multiple ways of traversing an object, such as a tree.
*/

class Node {
  value: any;
  left: Node | null;
  right: Node | null;
  parent: Node | null;

  constructor(value: any, left: Node | null = null, right: Node | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = null;

    if (this.left) left!.parent = this;
    if (this.right) right!.parent = this;
  }
}

// This function is an iterator that traverses a tree in order by going to the leftmost node, then the parent of that node, then the right child of that parent, and so on.
// Iterators in JavaScript must always have a next() method that returns an object with a value and done property.
function makeInOrderIterator(root: Node) {
  // go to leftmost
  let current = root;
  while (current.left) {
    current = current.left;
  }
  let yieldedStart = false;

  return {
    next: function () {
      if (!yieldedStart) {
        yieldedStart = true;
        return {
          value: current,
          done: false,
        };
      }
      if (current.right) {
        current = current.right;
        while (current.left) {
          current = current.left;
        }
        return {
          value: current,
          done: false,
        };
      } else {
        let p = current.parent;
        while (p && current === p.right) {
          current = p;
          p = p.parent;
        }
        current = p;
        return {
          value: current,
          done: current == null,
        };
      }
    }, // next

    // this makes the iterator iterable
    [Symbol.iterator]: function () {
      return this;
    },
  };
}

// Iterator pattern
// This class is iterable, and it returns an iterator that traverses the tree in order.
class BinaryTree {
  rootNode: Node;

  constructor(rootNode: Node) {
    this.rootNode = rootNode;
  }

  // assuming only one form of iteration
  [Symbol.iterator]() {
    return makeInOrderIterator(this.rootNode);
  }

  /* 
      This function implements a better way of traversing the tree in order.
      This is a generator function.
      A generator function allows us to declare a function that behaves like an iterator.
      i.e. it can be paused and resumed, allowing it to produce a sequence of results (yielded values) over time.
  
      This is a more efficient way to perform an in order traversal, because it doesn't require us to store the entire tree in memory.
      This also makes the code much simpler.
  
      Generators use the yield keyword, which is a special keyword that can be used in a generator to return a value.
      If we are using the yield keyword, we need to use * in front of the function name.
      The yield keyword will return a value, and the generator will pause until the next value is requested.
    */
  *betterInOrder() {
    /*
        This is a recursive generator function.
        It will traverse the tree in order.
        It will go to the leftmost node, then the parent of that node, then the right child of that parent, and so on.
      */
    function* traverse(current: Node) {
        //traverse the entire left most branch of the tree
      if (current.left) {
        for (let left of traverse(current.left)) yield left;
      }
      yield current;
      if (current.right) {
        for (let right of traverse(current.right)) yield right;
      }
    }
    for (let node of traverse(this.rootNode)) yield node;
  }

  get inOrder() {
    return makeInOrderIterator(this.rootNode);
  }
}

/*
    The tree looks like:
       1
      / \
     2   3
  
    There are multiple ways to traverse this tree, and each way will give a different result:
    in-order:  213
    pre-order:  123
    post-order: 231
  */

let root = new Node(1, new Node(2), new Node(3));

let tree = new BinaryTree(root);

for (let x of tree) console.log(x.value);

console.log([...tree].map((x) => x.value));

console.log([...tree.inOrder].map((x) => x.value));

// a generator is both an iterator and iterable
console.log("using a generator...");
console.log([...tree.betterInOrder()].map((x) => x.value));

for (let x of tree.betterInOrder()) console.log(x.value);
