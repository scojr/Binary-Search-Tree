const unsortedArray = [7, 2, 4, 1, 3, 5, 6];

function buildTree(
  array,
  start = 0,
  end = array.length - 1,
) {
  const sortedArray = mergeSort(array);
  if (start > end) return null;
  else {
    const mid = Math.floor((start + end) / 2);
    const root = new Node(sortedArray[mid]);
    root.left = buildTree(sortedArray, start, mid - 1)
    root.right = buildTree(sortedArray, mid + 1, end)
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
        sortedArray.push(array1[arr1Index]);
        arr1Index++;
      } else {
        sortedArray.push(array2[arr2Index]);
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

prettyPrint(tree.root);