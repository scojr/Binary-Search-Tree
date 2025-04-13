function buildTree(
  array,
  start = 0,
  end = array.length - 1,
) {
  if (start > end) return null;
  else {
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = buildTree(array, start, mid - 1)
    root.right = buildTree(array, mid + 1, end)
    return root;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}

const array = [1, 2, 3, 4, 5, 6, 7];

const tree = new Tree(array);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.root);