class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr) {    
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[i]) {
                    [arr[j], arr[i]] = [arr[i], arr[j]]; // selection sort
                }
            }
        }
        this.root = this.buildTree(arr); // recursively build tree
        let n = 0;
    }
    buildTree(arr) {
        if(arr.length == 0) {
            return null;
        }
        let midIndex = Math.floor(arr.length / 2);
        let root = new Node(arr[midIndex]);
        root.left = this.buildTree(arr.slice(0, midIndex));
        root.right = this.buildTree(arr.slice(midIndex + 1));
        return root;
    }
    includes(value, root = this.root) {
        if (root == null) return false;
        if (value == root.data) return true;
        if (value < root.data) return this.includes(value, root.left);
        if (value > root.data) return this.includes(value, root.right);
        return false;
    }
    insert(value, root = this.root) {
        if (this.root == null) {
            this.root = new Node(value, null, null);
            return;
        }

        if (value <= root.data) {
            if (!root.left) {
                root.left = new Node(value, null, null);
                return;
            }
            this.insert(value, root.left);
        } else {
            if (!root.right) {
                root.right = new Node(value, null, null);
                return;
            }
            this.insert(value, root.right);
        }
    }
    deleteItem(value, root = this.root) {
        if (root == null) return null;
        
        if (value < root.data) {
            root.left = this.deleteItem(value, root.left);
        } else if (value > root.data) {
            root.right = this.deleteItem(value, root.right);
        } else {
            // Node found - handle three cases:
            
            // Case 1: No children (leaf node)
            if (root.left == null && root.right == null) {
                return null;
            }
            
            // Case 2: One child
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            
            // Case 3: Two children - find inorder successor
            let successor = root.right;
            while (successor.left != null) {
                successor = successor.left;
            }
            root.data = successor.data;
            root.right = this.deleteItem(successor.data, root.right);
        }
        return root;
    }
    levelOrderForEach(callback, root = this.root) {
        if (!callback) {
            throw new Error("callback not specified");
        }
        if (!root) return

        const queue = [root];

        while (queue.length > 0) {
            const node = queue.shift();
            callback(node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    inOrderForEach(callback, root = this.root) {
        if (root == null) return;
        this.inOrderForEach(callback, root.left);
        callback(root);
        this.inOrderForEach(callback, root.right);
    }
    preOrderForEach(callback, root = this.root) {
        if (root == null) return;
        callback(root);
        this.preOrderForEach(callback, root.left);
        this.preOrderForEach(callback, root.right);
    }
    postOrderForEach(callback, root = this.root) {
        if (root == null) return;
        this.postOrderForEach(callback, root.left);
        this.postOrderForEach(callback, root.right); 
        callback(root);
    }
    depth(root, value, firstRun = true) {
        if (firstRun) {
            let n = 0;
            firstRun = false;
        }
        if (root == null) {
            return;
        }
        if (root.data == value) {
            return n;
        }
        if (root.left) {
            n++;
            this.height(root.left);
        }
        if (root.right) {
            this.height(root.right);
        }
    }
    checkHeight(node) {
        if (node == null) return 0;
        let leftHeight = this.checkHeight(node.left);
        if (leftHeight == -1) return -1;
        let rightHeight = this.checkHeight(node.right);
        if (rightHeight == -1) return -1;
        let heightDifference = Math.abs(leftHeight - rightHeight);
        if (heightDifference > 1) {
            return -1;
        }
        return Math.max(leftHeight, rightHeight) + 1;
    }
    isBalanced(node = this.root) {
        return (this.checkHeight(node) != -1);
    }
    rebalance() {
        const values = [];
        this.inOrderForEach(node => values.push(node.data)); // grab sorted values

        const newTree = new Tree(values); // reuse the constructor to sort + buildTree again
        this.root = newTree.root;
    }
}

const buildPrettyTree = (node, prefix = '', isLeft = true, lines = []) => {
    if (node === null || node === undefined) {
        return lines;
    }

    buildPrettyTree(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false, lines);
    lines.push(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    buildPrettyTree(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true, lines);
    return lines;
};

const prettyPrint = (node) => {
    const output = buildPrettyTree(node).join('\n');
    const outputContainer = document.querySelector('#tree-output');

    const pre = document.createElement('pre');
    pre.textContent = output;

    if (outputContainer) {
        outputContainer.replaceChildren(pre);
    } else {
        document.body.append(pre);
    }

    console.log(output);
};

const myTree = new Tree([3, 2, 9, 5, 4]);
myTree.insert(7);
myTree.insert(1);
console.log("Before delete:");
prettyPrint(myTree.root);
console.log(myTree.includes(7));

myTree.root = myTree.deleteItem(7);
console.log("After delete:");
prettyPrint(myTree.root);
console.log(myTree.includes(7));
console.log(myTree.includes(42));
myTree.root = myTree.deleteItem(7);
prettyPrint(myTree.root);
console.log(myTree.includes(7));
function createRandomNumbers(low, high, n) {
    let arr = [low, high, n];
    if (arr.some(isNaN) || high < low || n < 0) {
        throw new Error('Error');
        return;
    }
    arr2 = [];
    for (let i = 0; i < n; i++) {
        let x = Math.floor(Math.random() * (high - low)) + low;    
        arr2.push(x);    
    }
    return arr2;
}

let rndarray = createRandomNumbers(10,200,10);
const myTree2 = new Tree(rndarray);
myTree2.insert(144);
myTree2.insert(377);
myTree2.insert(190);
myTree2.insert(269);
prettyPrint(myTree2.root);
const results = document.createElement('div');
document.body.appendChild(results);
results.innerText += '\nisBalanced = ' + myTree2.isBalanced();
const inOrderResults = [];
myTree2.inOrderForEach(node => inOrderResults.push(node.data));
results.innerText += '\ninOrderForEach = ' + inOrderResults.join(', ');
const preOrderResults = [];
myTree2.preOrderForEach(node => preOrderResults.push(node.data));
results.innerText += '\npreOrderForEach = ' + preOrderResults.join(', ');
const postOrderResults = [];
myTree2.postOrderForEach(node => postOrderResults.push(node.data));
results.innerText += '\npostOrderForEach = ' + postOrderResults.join(', ');
myTree2.rebalance();
results.innerText += '\nAfter rebalance is the tree balanced = '  + myTree2.isBalanced();
