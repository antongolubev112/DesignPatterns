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

    if (left) left.parent = this;
    if (right) right.parent = this;
  }

  *_traverse(current: Node): Generator<Node, void, unknown> {
    // yield the current node
    yield current;
    console.log(current.toString());

    /*
        If current node has a left child, traverse is recursively called.
        This will yield the left most branch of the tree.

        When there is no left child node, the function yields the current node - the deepest left node - and checks for a right child node.
        If there is a right child node, the function is recursively called again.
        It will traverse the left most branch of the right child node.
        And then it will traverse the right child nodes of this node.

        Once the function has finished traversing a node's left and right child nodes, it will return to that node's parent node and traverse its right child nodes.
        The parent node's right child nodes will be traversed in the same way as the previous node's right child nodes.
        This will continue until the root node is reached.
        Once the root node has been traversed, the function will traverse the root node's right child nodes.
    */

    if (current.left) {
      for (let left of this._traverse(current.left)) yield left;
    }
    if (current.right) {
      for (let right of this._traverse(current.right)) yield right;
    }
  }

  *preorder(): Generator<any, void, unknown> {
    // return all the node *values* (not the nodes)
    for (let node of this._traverse(this)) yield node.value;
  }

  toString(): string {
    return `Node ${this.value}. Has left node: ${
      this.left != null
    }. Has right node: ${this.right != null}`;
  }
}
