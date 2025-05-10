import Tree from "./binary-search-tree.js";

const randomArray = createRandomArray(10);
console.log(randomArray);

function createRandomArray(length) {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(Math.floor(Math.random() * 100))
  }
  return result;
}