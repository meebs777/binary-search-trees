import { Tree } from "./bst.js";

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

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
const array = [];
for (let index = 0; index < 10; index++){
    array.push(getRandomInt(1, 101));
}

//Create tree with random array
const tree = Tree(array);

//Check initial balance 
console.log("Tree should be balanced. Expected true: ", tree.isBalanced(tree.getRoot()));

//Print elements through different dfs and bfs searches
const levelOrder = [];
const preOrder = [];
const inOrder = [];
const postOrder = [];

tree.levelOrderForEach(tree.getRoot(), (node) => {
    levelOrder.push(node.data);
})
console.log(levelOrder)
tree.preOrder(tree.getRoot(), (node) => {
    preOrder.push(node.data);
})
console.log(preOrder)
tree.inOrder(tree.getRoot(), (node) => {
    inOrder.push(node.data);
})
console.log(inOrder)
tree.postOrder(tree.getRoot(), (node) => {
    postOrder.push(node.data);
})
console.log(postOrder)

//Unbalance the tree
tree.insert(tree.getRoot(),101)
tree.insert(tree.getRoot(),102)
tree.insert(tree.getRoot(),103)
tree.insert(tree.getRoot(),104)
tree.insert(tree.getRoot(), 105)
console.log("Tree is balanced. Expected false: ", tree.isBalanced(tree.getRoot()))
prettyPrint(tree.getRoot())

//Rebalance the tree
tree.reBalance();
console.log("Tree should be rebalanced. Expected true: ",tree.isBalanced(tree.getRoot()))

//Empty Arrays
levelOrder.length = 0;
preOrder.length = 0;
inOrder.length = 0;
postOrder.length = 0;

//Reprint elements
tree.levelOrderForEach(tree.getRoot(), (node) => {
    levelOrder.push(node.data);
})
console.log(levelOrder)
tree.preOrder(tree.getRoot(), (node) => {
    preOrder.push(node.data);
})
console.log(preOrder)
tree.inOrder(tree.getRoot(), (node) => {
    inOrder.push(node.data);
})
console.log(inOrder)
tree.postOrder(tree.getRoot(), (node) => {
    postOrder.push(node.data);
})
console.log(postOrder)


prettyPrint(tree.getRoot())