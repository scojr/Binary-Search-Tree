class Node {
  #data;
  #left;
  #right;
  constructor(data) {
    this.#data = data;
  }
  getData() {
    return this.#data;
  }
  getLeft() {
    return this.#left;
  }
  getRight() {
    return this.#right;
  }
  setLeft(node) {
    this.#left = node;
  }
  setRight(node) {
    this.#right = node;
  }
}

class Tree {
  constructor() {

  }
}

function buildTree(array) {
  const sortedArray = sortArray(array);
  const tree = new Tree(sortedArray);
  return tree;


  function sortArray() {

  }
}