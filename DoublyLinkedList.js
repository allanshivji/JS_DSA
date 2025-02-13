class Node {
	constructor(val) {
		this.val = val
		this.next = null
		this.prev = null
	}
}

class DoublyLinkedList {
	constructor () {
		this.head = null
    this.tail = null
    this.length = 0
	}

	push(value) { // add to end
		let newNode = new Node(value)
		if (!this.head) {
      this.head = newNode;
      this.tail = this.head; 
    } else {
			this.tail.next = newNode
			newNode.prev = this.tail
      this.tail = newNode
		}
		this.length++
		return this
	}

	unshift(value) { // add new node to begining of the linked list
		let newNode = new Node(value)
		if (!this.head) {
      this.head = newNode;
      this.tail = this.head; 
    } else {
			this.head.prev = newNode
			newNode.next = this.head
			this.head = newNode
		}
		this.length++
		return this
	}

	pop() {
		if (this.head === null) { // List is empty
      return undefined
    } else if (this.head.next === null) { // List with one only one node
      this.head = null
      this.tail = null
    } else {
			let temp = this.tail
			this.tail = this.tail.prev
			this.tail.next = null
			temp.prev = null
		}
		this.length--
		return this
	}

	shift() { // remove from the begining
		if (this.head === null) { // List is empty
      return undefined
    } else if (this.head.next === null) { // List with one only one node
      this.head = null
      this.tail = null
    } else {
			let temp = this.head.next
			this.head = temp
			this.head.prev = null
			temp.next = null
			
		}
		this.length--
	}

	get(index) {
    if (index < 0 || index >= this.length) {
      return undefined
    }
		// This is optimized version else we can just do like in SLL
    let temp = this.head
		if (index < this.length/2){
			for (let i=0; i<index; i++) {
				temp = temp.next
			}
		} else {
			for (let i=this.length-1; i>index; i--) {
				temp = temp.prev
			}
		}
		return temp
  }

	set(index, value) {
    var foundNode = get(index)
    if (!foundNode) {
      return false
    }
    foundNode.val = value
  }

	insert(index, value) {
    if (index < 0 || index >= this.length) {
      return undefined
    }
    if (index === 0) return this.unshift(value) // add to start
    if (index === this.length) return this.push(value) // add to end

		const newNode = new Node(value)
    const before = this.get(index - 1)
    const after = before.next

		before.next = newNode
		newNode.prev = before
		newNode.next = after
		after.prev = newNode

		this.length++

    return this
	}

	remove (index) {
		if (index < 0 || index >= this.length) return undefined
    if (index === 0) return this.shift() // remove from start
    if (index === this.length) return this.pop() // remove from end

		const nodeToRemove = this.get(index)

		nodeToRemove.prev.next = nodeToRemove.next.next
		nodeToRemove.next.prev = nodeToRemove.prev
		nodeToRemove.prev = null
		nodeToRemove.next = null
		this.length--
    return this
	}

	
}


const dll = new DoublyLinkedList()
dll.push(1)
dll.push(2)
dll.push(3)
dll.push(4)
dll.push(5)

console.log('Pushed', dll)
console.log('Index',JSON.stringify(dll.get(4)) )