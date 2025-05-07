const unsortedArrays = [
  [20, 10, 30],
  [0, 1, 3, 4, 6, 8],
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
  constructor(root) {
    this.root = root;
  }
}

function buildTree(array) {
  const sortedArray = mergeSort(array);
  const tree = new Tree(sortedArray);
  return tree;
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
      if (typeof array2[arr2Index] !== "number") {
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
    sortedArray.push(array1[arr1Index] || array2[arr2Index]);
    return sortedArray;
  }
}