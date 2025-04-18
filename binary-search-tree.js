const unsortedArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

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
    this.root = buildTree(mergeSort(array));
  }

  insert(value) {
    const nearestNode = this.findNearestNode(value);
    const newNode = new Node(value);
    if (value <= nearestNode.data) {
      nearestNode.left = newNode;
    }
    if (value > nearestNode.data) {
      nearestNode.right = newNode;
    }
  }

  findValue(value) {
    const nearestNode = this.findNearestNode(value);
    if (nearestNode.data === value) return nearestNode;
    return null;
  }

  findNearestNode(value, node = this.root, prevNode) {
    if (node === null) return prevNode;
    if (node.data === value) return node;
    if (node.data > value) return this.findNearestNode(value, node.left, node);
    if (node.data < value) return this.findNearestNode(value, node.right, node);
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

const tree = new Tree(unsortedArray);

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

tree.insert(53);
tree.insert(78);
prettyPrint(tree.root);