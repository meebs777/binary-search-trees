function Node(data) {
  let left = null;
  let right = null;
  return { data, left, right };
}

function Tree(array) {
  const build = (array, start, end) => {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let node = Node(array[mid]);
    node.left = build(array, start, mid - 1);
    node.right = build(array, mid + 1, end);

    return node;
  };

  const buildTree = (array) => {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    return build(sortedArray, 0, sortedArray.length - 1);
  };
  let root = buildTree(array);

  const insert = (root,value) => {
    if (root === null) return new Node(value);
     
    if (value > root.data) {
      root.right = insert(root.right,value)
    } else {
      root.left = insert(root.left, value)
    }

    return root;
  }

  const rootSuccessor = (root) => {
    let curr = root.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  } 

  const deleteItem = (root, value) => {
    if (root === null) return root;

    if (root.data > value) {
      root.left = deleteItem(root.left, value);
    } else if (root.data < value) {  
      root.right = deleteItem(root.right, value);
    } else {
      if (root.left === null)
        return root.right;
      if (root.right === null)
        return root.left;

      const succ = rootSuccessor(root);
      root.data = succ.data;
      root.right = deleteItem(root.right,succ.data)
    }
    return root;
  }

  const find = (root,value) => {
    if (root === null) return null;
    let curr = root;
    if (curr.data === value) return curr;
    if (curr.data > value) {
      return find(curr.left, value);
    }
    if (curr.data < value) {
      return find(curr.right, value);
    }
  }

  const levelOrderForEach = (root, callback) => {
    if(typeof callback !== "function") throw new Error("Callback is not a function")
    if (root === null) return null;
    const queue = [];
    queue.push(root);
    while (queue.length !== 0) {
      const node = queue.shift();
      callback(node)
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  const preOrder = (root, callback) => {
    if(typeof callback !== "function") throw new Error("Callback is not a function")
    if (root === null) return;
    callback(root);
    preOrder(root.left, callback);
    preOrder(root.right, callback);
  }

  const inOrder = (root, callback) => {
    if (typeof callback !== "function") throw new Error("Callback is not a function")
    if (root === null) return;
    inOrder(root.left, callback);
    callback(root);
    inOrder(root.right, callback);
  }

  const postOrder = (root, callback) => {
    if(typeof callback !== "function") throw new Error("Callback is not a function")
    if (root === null) return;
    postOrder(root.left, callback);
    postOrder(root.right, callback);
    callback(root);
  }

  const depth = (root,value) => {
    if (find(root, value) === null) return null;
    let count = 0;
    if (root.data === value) {
      return count;
    }
    if (root.right !== null && root.data < value) {
      count+= depth(root.right, value)
      count++;
    }
    if (root.left !== null && root.data > value) {
      count+= depth(root.left, value);
      count++;
    }
    return count
  }

  const traverse = (root) => {
    let count = 0;
    let left = 0;
    let right = 0;
    if (root.right !== null) {
      right += traverse(root.right);
      right++;
    }
    if (root.left !== null) {
      left = traverse(root.left);
      left++;
    }
    return right > left ? count = right : count = left;
  }

  const height = (root, value) => {
    if (find(root, value) === null) return null;
    let count = 0;
    if (root.data === value) {
      count = traverse(root);
    } else if (root.right !== null && root.data < value) {
      count = height(root.right, value);
    } else if (root.left !== null && root.data > value) {
      count = height(root.left, value);
    } 
    return count;
  }

  const isBalanced = (root) => {
    if (root === null) return true;
    if (height(root,root.data)===0) return true;
    let left = root.left;
    let right = root.right;
    let leftBalanced = true;
    let rightBalanced = true;
    let leftHeight = 0;
    let rightHeight = 0;
    if (left !== null) {
      leftBalanced = isBalanced(left);
      leftHeight = height(left,left.data)
    }
    if (right !== null) {
      rightBalanced = isBalanced(right);
      rightHeight = height(right, right.data);
    }
    if (height(root,root.data) > 1 && root.left === null) {
      return false
    }
    if (height(root,root.data) > 1 && root.right === null) {
      return false
    }
    if (!leftBalanced || !rightBalanced) 
      return false
    return Math.abs(leftHeight - rightHeight) <= 1 ? true : false;
  }

  const reBalance = () => {
    const arr = [];
    inOrder(root, (node) => { arr.push(node.data) })
    root = build(arr, 0, arr.length - 1);
  }
  const getRoot = () => { return root };

  return { root,insert,getRoot,find,levelOrderForEach, preOrder, inOrder, postOrder, height, traverse, isBalanced, deleteItem, reBalance };
}

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

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

const unbalancedTree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
unbalancedTree.insert(unbalancedTree.root, 11);
unbalancedTree.insert(unbalancedTree.root, 12);
unbalancedTree.insert(unbalancedTree.root, 13);
unbalancedTree.insert(unbalancedTree.root, 14);
unbalancedTree.insert(unbalancedTree.root, 15);
const arr = [];
prettyPrint(tree.root);
tree.insert(tree.root,22)
prettyPrint(tree.root);
console.log(tree.find(tree.root, 22));
tree.postOrder(tree.root, (node) => arr.push(node.data))
console.log(tree.height(tree.root, 77))
console.log(tree.height(tree.root, 22))
console.log(tree.isBalanced(tree.root))
prettyPrint(unbalancedTree.root);
console.log(tree.isBalanced(unbalancedTree.root))
unbalancedTree.reBalance();
prettyPrint(unbalancedTree.getRoot())
console.log(tree.isBalanced(unbalancedTree.getRoot()))
// Paste your Tree and Node functions here first
// Then use these test cases:

// console.log("=== TEST 1: Perfectly Balanced Tree ===");
// const tree1 = Tree([1, 2, 3, 4, 5, 6, 7]);
// console.log("Array: [1, 2, 3, 4, 5, 6, 7]");
// console.log("Expected: true (perfectly balanced)");
// console.log("Result:", tree1.isBalanced(tree1.root));
// console.log("");

// console.log("=== TEST 2: Single Node ===");
// const tree2 = Tree([5]);
// console.log("Array: [5]");
// console.log("Expected: true (single node is balanced)");
// console.log("Result:", tree2.isBalanced(tree2.root));
// console.log("");

// console.log("=== TEST 3: Two Nodes (Left Heavy) ===");
// const tree3 = Tree([1, 2]);
// console.log("Array: [1, 2]");
// console.log("Expected: true (height difference = 1)");
// console.log("Result:", tree3.isBalanced(tree3.root));
// console.log("");

// console.log("=== TEST 4: Unbalanced - Insert Makes It Unbalanced ===");
// const tree4 = Tree([1, 2, 3, 4, 5, 6, 7]);
// tree4.root = tree4.insert(tree4.root, 8);
// tree4.root = tree4.insert(tree4.root, 9);
// tree4.root = tree4.insert(tree4.root, 10);
// console.log("Array: [1, 2, 3, 4, 5, 6, 7] + inserted 8, 9, 10");
// console.log("Expected: false (right side becomes too heavy)");
// console.log("Result:", tree4.isBalanced(tree4.root));
// console.log("");

// console.log("=== TEST 5: Larger Balanced Tree ===");
// const tree5 = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
// console.log("Array: [1-15]");
// console.log("Expected: true (perfect binary tree)");
// console.log("Result:", tree5.isBalanced(tree5.root));
// console.log("");

// console.log("=== TEST 6: Unbalanced Left Side ===");
// const tree6 = Tree([5]);
// tree6.root = tree6.insert(tree6.root, 3);
// tree6.root = tree6.insert(tree6.root, 1);
// tree6.root = tree6.insert(tree6.root, 0);
// console.log("Built tree with left-side chain: 5 -> 3 -> 1 -> 0");
// console.log("Expected: false (left chain too long)");
// console.log("Result:", tree6.isBalanced(tree6.root));
// console.log("");

// console.log("=== TEST 7: Unbalanced Right Side ===");
// const tree7 = Tree([1]);
// tree7.root = tree7.insert(tree7.root, 2);
// tree7.root = tree7.insert(tree7.root, 3);
// tree7.root = tree7.insert(tree7.root, 4);
// console.log("Built tree with right-side chain: 1 -> 2 -> 3 -> 4");
// console.log("Expected: false (right chain too long)");
// console.log("Result:", tree7.isBalanced(tree7.root));
// console.log("");

// console.log("=== TEST 8: Balanced but Not Perfect ===");
// const tree8 = Tree([1, 2, 3, 4, 5, 6]);
// console.log("Array: [1, 2, 3, 4, 5, 6]");
// console.log("Expected: true (balanced but not perfect)");
// console.log("Result:", tree8.isBalanced(tree8.root));
// console.log("");

// console.log("=== TEST 9: Empty Tree (Edge Case) ===");
// const tree9 = Tree([5]);
// tree9.root = null;
// console.log("Root set to null");
// console.log("Expected: true (empty tree is balanced)");
// console.log("Result:", tree9.isBalanced(tree9.root));
// console.log("");

// console.log("=== TEST 10: After Deletion - Still Balanced ===");
// const tree10 = Tree([1, 2, 3, 4, 5, 6, 7]);
// tree10.root = tree10.deleteItem(tree10.root, 1);
// console.log("Array: [1, 2, 3, 4, 5, 6, 7], deleted 1");
// console.log("Expected: true (should remain balanced)");
// console.log("Result:", tree10.isBalanced(tree10.root));
// console.log("");

// console.log("=== TEST 11: After Deletion - Becomes Unbalanced ===");
// const tree11 = Tree([1, 2, 3, 4, 5]);
// tree11.root = tree11.deleteItem(tree11.root, 1);
// tree11.root = tree11.deleteItem(tree11.root, 2);
// console.log("Array: [1, 2, 3, 4, 5], deleted 1 and 2");
// console.log("Expected: Check manually - likely false");
// console.log("Result:", tree11.isBalanced(tree11.root));
// prettyPrint(tree11.root)
// console.log(tree11.height(tree11.root, 3))

// const tree12 = Tree([4]);
// tree12.root = tree12.insert(tree12.root, 2);
// tree12.root = tree12.insert(tree12.root, 6);
// tree12.root = tree12.insert(tree12.root, 1);
// tree12.root = tree12.insert(tree12.root, 5);
// tree12.root = tree12.insert(tree12.root, 7);
// tree12.root = tree12.insert(tree12.root, 8);
// tree12.root = tree12.insert(tree12.root, 9);

// // Tree structure:
// //       4
// //      / \
// //     2   6
// //    /   / \
// //   1   5   7
// //            \
// //             8
// //              \
// //               9

// console.log("Should be false:", tree12.isBalanced(tree12.root));
