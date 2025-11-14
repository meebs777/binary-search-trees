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
  const getRoot = () => { return root };

  return { root,insert,getRoot,find,levelOrderForEach, preOrder, inOrder, postOrder };
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

const arr = [];
prettyPrint(tree.root);
tree.insert(tree.root,22)
prettyPrint(tree.root);
console.log(tree.find(tree.root, 22));
tree.postOrder(tree.root, (node) => arr.push(node.data))
console.log(arr)
