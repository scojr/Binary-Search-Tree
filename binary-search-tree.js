const unsortedArrays = [
  [20, 10, 30],
  [0, 1, 3, 4, 6, 8, 7, 7, 7],
  [-6, 0, 2.6, 11, 13],
  [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324],
];

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
  insert(value) {
    insertRecursion(this.root, value);
    function insertRecursion(root, x) {
      if (root === null) return new Node(x);
      if (x === root.data) throw new Error(`Value ${x} already present in Tree`);
      if (x < root.data) root.left = insertRecursion(root.left, x);
      else if (x > root.data) root.right = insertRecursion(root.right, x);
      return root;
    }
  }
  deleteItem(value) {
    deleteRecursion(this.root, value)

    function getSuccessor(curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) curr = curr.left;
      return curr;
    }

    function deleteRecursion(root, x) {
      if (root === null) return root;
      if (root.data > x) root.left = deleteRecursion(root.left, x);
      else if (root.data < x) root.right = deleteRecursion(root.right, x);
      else {
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;
        let successor = getSuccessor(root);
        root.data = successor.data;
        root.right = deleteRecursion(root.right, successor.data);
      }
      return root;
    }
  }
  prettyPrint() {
    prettyPrintRecursion(this.root);
    function prettyPrintRecursion(node, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrintRecursion(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        prettyPrintRecursion(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
  }
}

const myTree = new Tree(unsortedArrays[1]);
myTree.insert(11);
myTree.deleteItem(4);
myTree.prettyPrint();

function buildTree(array) {
  const sortedArray = mergeSort(array);
  const root = buildTreeRecursion(sortedArray, 0, sortedArray.length - 1);
  return root;

  function buildTreeRecursion(array, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);
    root.left = buildTreeRecursion(array, start, mid - 1);
    root.right = buildTreeRecursion(array, mid + 1, end);
    return root;
  }
}

function mergeSort(array) {
  if (array.length <= 1) return array;
  const leftHalf = mergeSort(array.slice(0, array.length / 2));
  const rightHalf = mergeSort(array.slice(array.length / 2, array.length));

  return merge(leftHalf, rightHalf);

  function merge(array1, array2) {
    const totalLength = array1.length + array2.length;
    let arr1Index = 0;
    let arr2Index = 0;
    const sortedArray = [];
    for (let i = 0; i < totalLength - 1; i++) {
      if (typeof array2[arr2Index] !== 'number') {
        return sortedArray.concat(array1.slice(arr1Index));
      }
      if (array1[arr1Index] <= array2[arr2Index]) {
        if (sortedArray[sortedArray.length - 1] !== array1[arr1Index]) {
          sortedArray.push(array1[arr1Index]);
        }
        arr1Index++;
      } else {
        if (sortedArray[sortedArray.length - 1] !== array2[arr2Index]) {
          sortedArray.push(array2[arr2Index]);
        }
        arr2Index++;
      }
    }
    sortedArray.push(array1[arr1Index] || array2[arr2Index])
    return sortedArray;
  }
}

