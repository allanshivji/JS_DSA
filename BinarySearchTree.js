class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(value) {
        let newNode = new Node(value)
        if(this.root === null) {
            this.root = newNode
            return this
        }
        let current = this.root
        while(true) {
            if (value === current.value) return undefined // If we are trying to enter same value as a node

            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode
                    return this
                }
                current = current.left
            } else if (value > current.value) {
                if (current.right === null) {
                    current.right = newNode
                    return this
                }
                current = current.right
            }
        }
    }

    contains(value) {
        if (this.root === null) return false
        let temp = this.root

        while(temp) {
            if (value < temp.value) {
                temp = temp.left
            } else if (value > temp.value) {
                temp = temp.right
            } else {
                // Means its equal and we have found the value
                return true
            }
        }
        return false
    }

    BFS() { // Check on the same levels if branches
        let data = []
        let queue = []
        let node = this.root
        queue.push(this.root)

        while (queue.length) {
            // remove something form start of the queue
            node = queue.shift()
            data.push(node)
            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
        }
        return data
    }

    DFSPreOrder() { // Keep on going till the end/reached leaf node and then go right
        let data = []
        let current = this.root
        function traverseNode(node) {
            data.push(node.value)
            if (node.left) {
                traverseNode(node.left)
            }
            if (node.right) {
                traverseNode(node.right)
            }
        }
        traverseNode(current)
        return data
    }

    DFSPostOrder() { // Explore entire left side see if it has right, go back, then check the right side of root and then the root node
        let data = []
        let current = this.root
        function traverseNode(node) {
            if (node.left) {
                traverseNode(node.left)
            }
            if (node.right) {
                traverseNode(node.right)
            }
            data.push(node.value)
        }
        traverseNode(current)
        return data
    }

    DFSInOrder() { // Traverse entire left side, root and then the right
        let data = []
        let current = this.root
        function traverseNode(node) {
            if (node.left) {
                traverseNode(node.left)
            }
            data.push(node.value)
            if (node.right) {
                traverseNode(node.right)
            }
        }
        traverseNode(current)
        return data
    }
}