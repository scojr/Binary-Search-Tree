import Tree from "./binary-search-tree.js";

const randomArray = createRandomArray(10);
const randomTree = new Tree(randomArray);

console.log(randomTree.isBalanced());

console.log('levelOrder');
randomTree.levelOrder(node => {
  console.log(node.data)
})

console.log('preOrder');
randomTree.preOrder(node => {
  console.log(node.data)
})

console.log('postOrder');
randomTree.postOrder(node => {
  console.log(node.data)
})

console.log('inOrder');
randomTree.inOrder(node => {
  console.log(node.data)
})

randomTree.insert(103)
randomTree.insert(763)
randomTree.insert(323)

console.log(randomTree.isBalanced());
randomTree.rebalance();
console.log(randomTree.isBalanced());
randomTree.prettyPrint();

console.log('levelOrder');
randomTree.levelOrder(node => {
  console.log(node.data)
})

console.log('preOrder');
randomTree.preOrder(node => {
  console.log(node.data)
})

console.log('postOrder');
randomTree.postOrder(node => {
  console.log(node.data)
})

console.log('inOrder');
randomTree.inOrder(node => {
  console.log(node.data)
})

function createRandomArray(length) {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(Math.floor(Math.random() * 100))
  }
  return result;
}