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
  rebalance() {
    const newArray = [];
    this.inOrder(node => {
      newArray.push(node.data);
    })
    this.root = buildTree(newArray);
  }
  isBalanced() {
    let result = true;
    this.preOrder(node => {
      let leftHeight = 0;
      let rightHeight = 0;
      if (node.left) leftHeight = this.height(node.left.data);
      if (node.right) rightHeight = this.height(node.right.data);
      if (leftHeight - rightHeight < -1 || leftHeight - rightHeight > 1) result = false;
    })
    return result;
  }
  height(value) {
    let result = null;
    this.getLevels((node, level) => {
      if (node.data === value) result = this.getLevels().length - level;
    })
    return result
  }
  depth(value) {
    let result = null;
    this.getLevels((node, level) => {
      if (node.data === value) result = level;
    })
    return result
  }
  postOrder(callback) {
    if (typeof callback !== 'function') throw new TypeError('callback is not a function');
    postOrderRecursion(this.root);
    function postOrderRecursion(node) {
      if (node === null) return;
      postOrderRecursion(node.left);
      postOrderRecursion(node.right);
      callback(node);
    }
  }
  preOrder(callback) {
    if (typeof callback !== 'function') throw new TypeError('callback is not a function');
    preOrderRecursion(this.root);
    function preOrderRecursion(node) {
      if (node === null) return;
      callback(node);
      preOrderRecursion(node.left);
      preOrderRecursion(node.right);
    }
  }
  inOrder(callback) {
    if (typeof callback !== 'function') throw new TypeError('callback is not a function');
    inOrderRecursion(this.root);
    function inOrderRecursion(node) {
      if (node === null) return;
      inOrderRecursion(node.left);
      callback(node);
      inOrderRecursion(node.right);
    }
  }
  getLevels(callback) {
    const result = [];
    getLevelsRecursion(this.root, 0, result);
    return result;
    function getLevelsRecursion(root, level, result) {
      if (root === null) return;
      if (callback) callback(root, level);
      if (result.length <= level) result.push([]);
      result[level].push(root.data);
      getLevelsRecursion(root.left, level + 1, result);
      getLevelsRecursion(root.right, level + 1, result);
    }
  }
  levelOrder(callback) {
    if (typeof callback !== 'function') throw new TypeError('callback is not a function');
    levelOrderRecursion([this.root]);
    function levelOrderRecursion(queue) {
      if (queue[0] === null || queue.length === 0) return;
      callback(queue[0]);
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      queue.shift();
      levelOrderRecursion(queue);
    }
  }
  find(value) {
    return findRecursion(this.root, value);
    function findRecursion(root, x) {
      if (root === null) return null;
      if (x === root.data) return root;
      if (x < root.data) return findRecursion(root.left, x);
      else if (x > root.data) return findRecursion(root.right, x);
      return root;
    }
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

export default Tree;